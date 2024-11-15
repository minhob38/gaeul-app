package com.minho.backend.api.auth.domain;

import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.auth.domain.mapper.AuthDomainMapper;
import com.minho.backend.api.auth.domain.port.AuthPersistencePort;
import com.minho.backend.constant.ErrorCode;
import com.minho.backend.exception.AuthException;
import com.minho.backend.util.AuthUtil;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.catchThrowable;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

//@SpringBootTest
@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private AuthPersistencePort userPersistenceAdapter;

    @Mock
    private AuthDomainMapper authDomainMapper;

    @Mock
    private AuthUtil authUtil;

    @InjectMocks
    private AuthService authService;

    User existingUser = User.builder().id(1L).email("gaeul@gmail.com").build();

    @Test
    @DisplayName("signup - success")
    void signupTest1() throws AuthException {
        // given
        AuthCommand.Signup command = new AuthCommand.Signup("gaeul@gmail.com", "qwerasdf");
        User createdUser = User.builder().id(1L).email("gaeul@gmail.com").build();
        AuthInfo authInfo = AuthInfo.builder().id(1L).email("gaeul@gmail.com").build();

        when(this.userPersistenceAdapter.findUserByEmail(anyString())).thenReturn(Optional.empty());
        when(this.authUtil.encodePassword(anyString())).thenReturn("encodedPassword");
        when(this.userPersistenceAdapter.createUser(any(User.class))).thenReturn(createdUser);
        when(this.authDomainMapper.toSignupInfo(any(User.class))).thenReturn(authInfo);

        // when
        AuthInfo result = this.authService.signup(command);

        // then
        assertEquals(authInfo.getEmail(), result.getEmail());
    }

    @Test
    @DisplayName("signup - fail(user already exists")
    void signupTest2() {
        // given
        AuthCommand.Signup command = new AuthCommand.Signup("gaeul@gmail.com", "qwerasdf");

        when(this.userPersistenceAdapter.findUserByEmail(anyString())).thenReturn(Optional.of(this.existingUser));

        // when
        Throwable throwable = catchThrowable(() -> this.authService.signup(command));

        // then
        assertThat(throwable).isInstanceOf(AuthException.class)
            .hasMessageContaining(ErrorCode.Auth.AUTH_0001.getDescription());
    }

    @Test
    @DisplayName("signup - fail")
    void signupTest3() {
        // given
        AuthCommand.Signup command = new AuthCommand.Signup("gaeul@gmail.com", "qwerasdf");

        when(this.userPersistenceAdapter.findUserByEmail(anyString())).thenReturn(Optional.of(this.existingUser));

        // when
        AuthException exception = assertThrows(AuthException.class, () -> {
            authService.signup(command);
        });

        // then
        assertEquals(ErrorCode.Auth.AUTH_0001.name(), exception.getCode());
        assertEquals(ErrorCode.Auth.AUTH_0001.getDescription(), exception.getMessage());
    }

    // @Test
    // void removeMe() {
    // }
    //
    // @Test
    // void signin() {
    // }
    //
    // @Test
    // void signout() {
    // }
    //
    // @Test
    // void modifyMe() {
    // }
    //
    // @Test
    // void readMe() {
    // }

}
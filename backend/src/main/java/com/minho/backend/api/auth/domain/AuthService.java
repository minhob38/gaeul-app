package com.minho.backend.api.auth.domain;

import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.auth.domain.mapper.AuthDomainMapper;
import com.minho.backend.api.auth.domain.port.AuthPersistencePort;
import com.minho.backend.api.auth.domain.port.AuthServicePort;
import com.minho.backend.constant.ErrorCode;
import com.minho.backend.exception.AuthException;
import com.minho.backend.util.AuthUtil;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements AuthServicePort {

    private final AuthPersistencePort userPersistenceAdapter;

    private final AuthDomainMapper authDomainMapper;

    private final AuthUtil authUtil;

    @Override
    public AuthInfo.SignupInfo signup(AuthCommand.SignupCommand command) throws AuthException {
        User user = command.toEntity();

        if (this.userPersistenceAdapter.findUserByEmail(user.getEmail()).isPresent()) {
            throw new AuthException(ErrorCode.Auth.AUTH_0001);
        }

        String encodedPassword = this.authUtil.encodePassword(user.getPassword());
        user.setPassword(encodedPassword);

        User createdUser = this.userPersistenceAdapter.createUser(user);

        return this.authDomainMapper.toSignupInfo(createdUser);
    }

    @Override
    public AuthInfo.SigninInfo signin(AuthCommand.SigninCommand command) throws AuthException {
        User user = command.toEntity();

        Optional<User> foundUser = this.userPersistenceAdapter.findUserByEmail(user.getEmail());

        if (foundUser.isEmpty()) {
            throw new AuthException(ErrorCode.Auth.AUTH_0001);
        }

        String plainPassword = user.getPassword();
        String encodedPassword = foundUser.get().getPassword();
        String key = foundUser.get().getKey();

        Boolean isPasswordMatched = this.authUtil.matchPassword(plainPassword, encodedPassword);

        if (!isPasswordMatched) {
            throw new AuthException(ErrorCode.Auth.AUTH_0011);
        }

        String accessToken = this.authUtil.createJwt(key, 15L);

        // TODO: String 대신, JWT Class로 만들기
        return this.authDomainMapper.toSigninInfo(key, accessToken);
    }

}

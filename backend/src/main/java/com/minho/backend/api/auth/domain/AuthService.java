package com.minho.backend.api.auth.domain;

import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.dto.AuthQuery;
import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.auth.domain.mapper.AuthDomainMapper;
import com.minho.backend.api.auth.domain.port.AuthPersistencePort;
import com.minho.backend.api.auth.domain.port.AuthServicePort;
import com.minho.backend.constant.ErrorCode;
import com.minho.backend.exception.AuthException;
import com.minho.backend.exception.ServerException;
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
    public AuthInfo.Signup signup(AuthCommand.Signup command) throws AuthException {
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
    public AuthInfo.Signin signin(AuthCommand.Signin command) throws AuthException {
        User user = command.toEntity();

        Optional<User> foundUser = this.userPersistenceAdapter.findUserByEmail(user.getEmail());

        if (foundUser.isEmpty()) {
            throw new AuthException(ErrorCode.Auth.AUTH_0002);
        }

        String plainPassword = user.getPassword();
        String encodedPassword = foundUser.get().getPassword();
        String key = foundUser.get().getKey();

        Boolean isPasswordMatched = this.authUtil.matchPassword(plainPassword, encodedPassword);

        if (!isPasswordMatched) {
            throw new AuthException(ErrorCode.Auth.AUTH_0011);
        }

        String accessToken = this.authUtil.createJwt(key, 1500000L);

        // TODO: String 대신, JWT Class로 만들기
        return this.authDomainMapper.toSigninInfo(key, accessToken);
    }

    @Override
    public AuthInfo.ModifyMe modifyMe(AuthCommand.ModifyMe command) throws AuthException, ServerException {
        User user = this.userPersistenceAdapter.findUserById(command.getUserId()).get();

        Optional<String> currentPassword = Optional.ofNullable(command.getCurrentPassword());
        Optional<String> newPassword = Optional.ofNullable(command.getNewPassword());

        if (currentPassword.isPresent() ^ newPassword.isPresent()) {
            throw new AuthException(ErrorCode.Auth.AUTH_0012);
        }

        if (newPassword.isPresent()) {
            String encodedPassword = user.getPassword();
            Boolean isPasswordMatched = this.authUtil.matchPassword(currentPassword.get(), encodedPassword);

            if (!isPasswordMatched) {
                throw new AuthException(ErrorCode.Auth.AUTH_0011);
            }

            if (currentPassword.get().equals(newPassword.get())) {
                throw new AuthException(ErrorCode.Auth.AUTH_0013);
            }

            String newEncodedPassword = this.authUtil.encodePassword(newPassword.get());
            user.changePassword(newEncodedPassword);
        }

        user.updateUser(command.getEmail());

        User updatedUser = this.userPersistenceAdapter.updateUser(user);

        return this.authDomainMapper.toModifyMe(updatedUser);
    }

    @Override
    public AuthInfo.ReadMe readMe(AuthQuery.ReadMe query) throws AuthException {
        User user = this.userPersistenceAdapter.findUserById(query.getUserId()).get();

        return this.authDomainMapper.toReadMeInfo(user);
    }

}

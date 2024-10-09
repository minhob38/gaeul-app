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
import org.mapstruct.control.MappingControl.Use;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements AuthServicePort {

    private final AuthPersistencePort userPersistenceAdapter;

    private final AuthDomainMapper authDomainMapper;

    private final AuthUtil authUtil;

    @Override
    public AuthInfo signup(AuthCommand.Signup command) throws AuthException {
        User user = command.toEntity();

        if (this.userPersistenceAdapter.findUserByEmail(user.getEmail()).isPresent()) {
            throw new AuthException(ErrorCode.Auth.AUTH_0001);
        }

        String encodedPassword = this.authUtil.encodePassword(user.getPassword());
        user.setPassword(encodedPassword);
        user.signup();

        User createdUser = this.userPersistenceAdapter.createUser(user);

        return this.authDomainMapper.toSignupInfo(createdUser);
    }

    @Override
    public AuthInfo removeMe(AuthCommand.RemoveMe command) throws AuthException, ServerException {
        User user = this.userPersistenceAdapter.findUserById(command.getUserId()).get();
        user.remove();
        User updatedUser = this.userPersistenceAdapter.updateUser(user);

        return this.authDomainMapper.toRemoveMeInfo(updatedUser);
    }

    @Override
    public AuthInfo signin(AuthCommand.Signin command) throws AuthException, ServerException {
        User user = command.toEntity();

        Optional<User> foundUserOpt = this.userPersistenceAdapter.findUserByEmail(user.getEmail());

        if (foundUserOpt.isEmpty()) {
            throw new AuthException(ErrorCode.Auth.AUTH_0002);
        }

        User foundUser = foundUserOpt.get();
        String plainPassword = user.getPassword();
        String encodedPassword = foundUserOpt.get().getPassword();
        String key = foundUserOpt.get().getKey();

        Boolean isPasswordMatched = this.authUtil.matchPassword(plainPassword, encodedPassword);

        if (!isPasswordMatched) {
            throw new AuthException(ErrorCode.Auth.AUTH_0011);
        }

        String accessToken = this.authUtil.createJwt(key, 1500000L);

        foundUser.signin();

        this.userPersistenceAdapter.updateUser(foundUser);

        // TODO: String 대신, JWT Class로 만들기
        return this.authDomainMapper.toSigninInfo(foundUser, accessToken);
    }

    @Override
    public AuthInfo signout(AuthCommand.Signout command) throws AuthException, ServerException {
        User user = this.userPersistenceAdapter.findUserById(command.getUserId()).get();
        user.signout();
        User updatedUser = this.userPersistenceAdapter.updateUser(user);

        return this.authDomainMapper.toSignoutInfo(updatedUser);
    }

    @Override
    public AuthInfo modifyMe(AuthCommand.ModifyMe command) throws AuthException, ServerException {
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

        user.modifyInformation(command.getName());

        User updatedUser = this.userPersistenceAdapter.updateUser(user);

        return this.authDomainMapper.toModifyMe(updatedUser);
    }

    @Override
    public AuthInfo readMe(AuthQuery.ReadMe query) throws AuthException {
        User user = this.userPersistenceAdapter.findUserById(query.getUserId()).get();

        return this.authDomainMapper.toReadMeInfo(user);
    }

}

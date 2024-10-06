package com.minho.backend.config.security;

import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.auth.domain.port.AuthPersistencePort;
import com.minho.backend.constant.ErrorCode;
import com.minho.backend.exception.AuthException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Component
public class AuthenticatedUserService implements UserDetailsService {

    private final AuthPersistencePort userPersistenceAdapter;

    @Override
    public AuthenticatedUser loadUserByUsername(String key) throws UsernameNotFoundException {
        Optional<User> foundUser = this.userPersistenceAdapter.findUserByKey(key);

        if (foundUser.isEmpty()) {
            throw new UsernameNotFoundException("");
        }

        User user = foundUser.get();

        AuthenticatedUser authenticatedUser = AuthenticatedUser.builder()
            .id(user.getId())
            .key(user.getKey())
            .email(user.getEmail())
            .password(user.getPassword())
            .createdAt(user.getCreatedAt())
            .updatedAt(user.getUpdatedAt())
            .build();

        return authenticatedUser;
    }

    public AuthenticatedUser findUserByKey(String key) throws AuthException {
        try {
            return this.loadUserByUsername(key);
        }
        catch (Exception e) {
            throw new AuthException(ErrorCode.Auth.AUTH_0002);
        }
    }

}

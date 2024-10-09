package com.minho.backend.api.auth.domain.port;

import com.minho.backend.api.auth.domain.entity.User;
import java.util.Optional;

public interface AuthPersistencePort {

    Optional<User> findUserById(Long id);

    Optional<User> findUserByEmail(String email);

    Optional<User> findUserByKey(String key);

    User createUser(User user);

}

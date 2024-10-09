package com.minho.backend.api.auth.domain.port;

import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.exception.ServerException;
import java.util.Optional;

public interface AuthPersistencePort {

    Optional<User> findUserById(Long id);

    Optional<User> findUserByEmail(String email);

    Optional<User> findUserByKey(String key);

    User createUser(User user);

    User updateUser(User user) throws ServerException;

}

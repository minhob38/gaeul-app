package com.minho.backend.api.auth.domain.port;

import com.minho.backend.api.auth.domain.entity.User;
import java.util.Optional;

public interface AuthPersistencePort {

    Optional<User> findUserByEmail(String email);

    User createUser(User user);

}

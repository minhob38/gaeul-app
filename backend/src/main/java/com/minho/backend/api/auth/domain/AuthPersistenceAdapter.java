package com.minho.backend.api.auth.domain;

import com.minho.backend.api.auth.domain.entity.User;
import java.util.Optional;

public interface AuthPersistenceAdapter {

  Optional<User> findUserByEmail(String email);

  User createUser(User user);
}

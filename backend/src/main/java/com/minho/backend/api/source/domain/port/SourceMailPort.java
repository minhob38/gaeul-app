package com.minho.backend.api.source.domain.port;

import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.source.domain.entity.Mail;
import com.minho.backend.exception.ServerException;
import java.util.List;
import java.util.Optional;

public interface SourceMailPort {

    List<Mail> fetchEmail(String email, String password);

    // Optional<User> findUserById(Long id);
    //
    // Optional<User> findUserByEmail(String email);
    //
    // Optional<User> findUserByKey(String key);
    //
    // User createUser(User user);
    //
    // User updateUser(User user) throws ServerException;

}

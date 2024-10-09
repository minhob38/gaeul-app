package com.minho.backend.api.auth.adapter.persistence;

import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.auth.domain.port.AuthPersistencePort;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

// domain에 port interface를 만들면...
@RequiredArgsConstructor
@Component
public class AuthPersistenceAdapter implements AuthPersistencePort {

    private final UserJpaRepository userRepository;

    @Override
    public Optional<User> findUserById(Long id) {
        Optional<UserJpaEntity> userJpaEntity = this.userRepository.findById(id);
        return userJpaEntity.map(jpaEntity -> jpaEntity.toEntity());
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        UserJpaEntity userJpaEntity = this.userRepository.findUserJpaEntityByEmail(email);
        return Optional.ofNullable(userJpaEntity).map(jpaEntity -> jpaEntity.toEntity());
    }

    @Override
    public Optional<User> findUserByKey(String email) {
        UserJpaEntity userJpaEntity = this.userRepository.findUserJpaEntityByKey(email);
        return Optional.ofNullable(userJpaEntity).map(jpaEntity -> jpaEntity.toEntity());
    }

    @Override
    public User createUser(User user) {
        UserJpaEntity userJpaEntity = user.toJpaEntity();
        UserJpaEntity savedUserJpaEntity = this.userRepository.save(userJpaEntity);
        User savedUser = savedUserJpaEntity.toEntity();
        return savedUser;
    }

}

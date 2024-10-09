package com.minho.backend.api.auth.adapter.persistence;

import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.auth.domain.port.AuthPersistencePort;
import com.minho.backend.constant.ErrorCode;
import com.minho.backend.exception.ServerException;
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
        UserJpaEntity createdUserJpaEntity = this.userRepository.save(userJpaEntity);
        User createdUser = createdUserJpaEntity.toEntity();

        return createdUser;
    }

    @Override
    public User updateUser(User user) throws ServerException {
        UserJpaEntity userJpaEntity = user.toJpaEntity();

        if (userJpaEntity.getId() == null) {
            throw new ServerException(ErrorCode.Server.SERVER_0001);
        }

        UserJpaEntity updatedUserJpaEntity = this.userRepository.save(userJpaEntity);
        User updatedUser = updatedUserJpaEntity.toEntity();

        return updatedUser;
    }

}

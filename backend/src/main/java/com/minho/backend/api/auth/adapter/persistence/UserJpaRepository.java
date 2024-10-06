package com.minho.backend.api.auth.adapter.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

interface UserJpaRepository extends JpaRepository<UserJpaEntity, Long> {

    UserJpaEntity findUserJpaEntityByEmail(String email);

    UserJpaEntity findUserJpaEntityByKey(String key);

}

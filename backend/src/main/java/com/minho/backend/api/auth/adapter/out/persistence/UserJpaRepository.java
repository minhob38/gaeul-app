package com.minho.backend.api.auth.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

interface UserJpaRepository extends JpaRepository<UserJpaEntity, Long> {
  UserJpaEntity findUserJpaEntityByEmail(String email);
}

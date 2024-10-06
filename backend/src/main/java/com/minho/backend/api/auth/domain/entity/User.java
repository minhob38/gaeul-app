package com.minho.backend.api.auth.domain.entity;

import com.minho.backend.api.auth.adapter.persistence.UserJpaEntity;
import java.util.Date;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@RequiredArgsConstructor
public class User {

    private Long id;

    private String key;

    private String email;

    @Setter // TODO: 별도의 메소드로 만들기
    private String password;

    private Date createdAt;

    private Date updatedAt;

    @Builder
    public User(Long id, String key, String email, String password, Date createdAt, Date updatedAt) {
        this.id = id;
        this.key = key;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public UserJpaEntity toJpaEntity() {
        return UserJpaEntity.builder().email(this.email).password(this.password).build();
    }

}
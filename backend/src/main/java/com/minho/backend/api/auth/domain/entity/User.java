package com.minho.backend.api.auth.domain.entity;

import com.minho.backend.api.auth.adapter.persistence.UserJpaEntity;
import java.time.ZonedDateTime;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Builder
@AllArgsConstructor
public class User {

    private Long id;

    private String key;

    private String email;

    private String name;

    @Setter // TODO: 별도의 메소드로 만들기
    private String password;

    private ZonedDateTime passwordChangedAt;

    private ZonedDateTime signedupAt;

    private Date signedinAt;

    private ZonedDateTime signedoutAt;

    private Date createdAt;

    private Date updatedAt;

    // @Builder
    // public User(Long id, String key, String email, String password, Date createdAt,
    // Date updatedAt) {
    // this.id = id;
    // this.key = key;
    // this.email = email;
    // this.name = name;
    // this.password = password;
    // this.createdAt = createdAt;
    // this.updatedAt = updatedAt;
    // }

    public UserJpaEntity toJpaEntity() {
        UserJpaEntity.UserJpaEntityBuilder builder = UserJpaEntity.builder()
            .id(this.id)
            .key(this.key)
            .email(this.email)
            .name(this.name)
            .password(this.password)
            .passwordChangedAt(this.passwordChangedAt)
            .signedupAt(this.signedupAt)
            .signedinAt(this.signedinAt)
            .signedoutAt(this.signedoutAt)
            .createdAt(this.createdAt)
            .updatedAt(this.updatedAt)
            .password(this.password);

        return builder.build();
    }

    public void signin() {
        this.signedinAt = new Date();
    }

    public void signout() {
        this.signedoutAt = ZonedDateTime.now();
    }

    public void changePassword(String newEncryptedPassword) {
        this.password = newEncryptedPassword;
        this.passwordChangedAt = ZonedDateTime.now();
    }

    public void updateUser(String name) {
        if (name != null) {
            this.name = name;
        }
    }

}
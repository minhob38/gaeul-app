package com.minho.backend.api.auth.domain.entity;

import com.minho.backend.api.auth.adapter.persistence.UserJpaEntity;
import java.time.ZonedDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
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

    private ZonedDateTime signedinAt;

    private ZonedDateTime signedoutAt;

    private ZonedDateTime createdAt;

    private ZonedDateTime updatedAt;

    private ZonedDateTime trashedAt;

    private ZonedDateTime untrashedAt;

    private ZonedDateTime purgedAt;

    private ZonedDateTime unpurgedAt;

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
            .trashedAt(this.trashedAt)
            .untrashedAt(this.untrashedAt)
            .purgedAt(this.purgedAt)
            .unpurgedAt(this.unpurgedAt)
            .createdAt(this.createdAt)
            .updatedAt(this.updatedAt);

        return builder.build();
    }

    public void signup() {
        this.signedupAt = ZonedDateTime.now();
        this.passwordChangedAt = ZonedDateTime.now();
    }

    public void remove() {
    }

    public void signin() {
        this.signedinAt = ZonedDateTime.now();
    }

    public void signout() {
        this.signedoutAt = ZonedDateTime.now();
    }

    public void changePassword(String newEncryptedPassword) {
        this.password = newEncryptedPassword;
        this.passwordChangedAt = ZonedDateTime.now();
    }

    public void modifyInformation(String name) {
        if (name != null) {
            this.name = name;
        }
    }

}
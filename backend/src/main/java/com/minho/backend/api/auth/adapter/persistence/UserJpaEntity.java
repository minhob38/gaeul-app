package com.minho.backend.api.auth.adapter.persistence;

import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.common.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.time.ZonedDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@ToString
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class UserJpaEntity extends BaseEntity {

    private String name;

    private String email;

    private String password;

    private ZonedDateTime passwordChangedAt;

    private ZonedDateTime signedupAt;

    // @Temporal(TemporalType.TIMESTAMP)
    private ZonedDateTime signedinAt;

    private ZonedDateTime signedoutAt;

    // @Builder
    // public UserJpaEntity(Long id, String email, String password, String key) {
    // this.id = id;
    // this.email = email;
    // this.key = key;
    // this.password = password;
    // }

    public User toEntity() {
        return User.builder()
            .id(this.getId())
            .key(this.getKey())
            .email(this.email)
            .name(this.name)
            .password(this.password)
            .passwordChangedAt(this.passwordChangedAt)
            .signedupAt(this.signedupAt)
            .signedinAt(this.signedinAt)
            .signedoutAt(this.signedoutAt)
            .createdAt(this.getCreatedAt())
            .updatedAt(this.getUpdatedAt())
            .build();
    }

}

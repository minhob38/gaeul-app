package com.minho.backend.api.auth.adapter.persistence;

import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.common.AuthType;
import com.minho.backend.api.common.BaseEntity;
import jakarta.persistence.*;

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

    @Enumerated(EnumType.STRING)
    private AuthType authType;

    private String name;

    private String email;

    private String password;

    private ZonedDateTime passwordChangedAt;

    private ZonedDateTime signedupAt;

    // @Temporal(TemporalType.TIMESTAMP)
    private ZonedDateTime signedinAt;

    private ZonedDateTime signedoutAt;

    private String refreshToken;

    private ZonedDateTime refreshTokenExpiresAt;

    private String oauthId;

    private String oauthName;

    private String oauthAccessToken;

    private ZonedDateTime oauthAccessTokenExpiresAt;

    private String oauthRefreshToken;

    private ZonedDateTime oauthRefreshTokenExpiresAt;

    public User toEntity() {
        return User.builder()
            .id(this.getId())
            .key(this.getKey())
            .authType(this.authType)
            .email(this.email)
            .name(this.name)
            .password(this.password)
            .passwordChangedAt(this.passwordChangedAt)
            .signedupAt(this.signedupAt)
            .signedinAt(this.signedinAt)
            .signedoutAt(this.signedoutAt)
            .refreshToken(this.refreshToken)
            .refreshTokenExpiresAt(this.refreshTokenExpiresAt)
            .oauthId(this.oauthId)
            .oauthName(this.oauthName)
            .oauthAccessToken(this.oauthAccessToken)
            .oauthAccessTokenExpiresAt(this.oauthAccessTokenExpiresAt)
            .oauthRefreshToken(this.oauthRefreshToken)
            .oauthRefreshTokenExpiresAt(this.oauthRefreshTokenExpiresAt)
            .trashedAt(this.getTrashedAt())
            .untrashedAt(this.getUntrashedAt())
            .purgedAt(this.getPurgedAt())
            .unpurgedAt(this.getUnpurgedAt())
            .createdAt(this.getCreatedAt())
            .updatedAt(this.getUpdatedAt())
            .build();
    }

}

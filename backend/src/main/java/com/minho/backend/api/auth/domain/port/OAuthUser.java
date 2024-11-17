package com.minho.backend.api.auth.domain.port;

import com.minho.backend.api.auth.domain.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.ZonedDateTime;

@ToString
@Getter
@Builder
public class OAuthUser {

    private final com.minho.backend.api.common.AuthType authType;

    private final String id;

    private final String email;

    private final String name;

    private final String accessToken;

    private final ZonedDateTime accessTokenExpiresAt;

    private final String refreshToken;

    private final ZonedDateTime refreshTokenExpiresAt;

    public User toEntity() {
        return User.builder()
            .authType(this.authType)
            .email(this.email)
            .name(this.name)
            .oauthName(this.name)
            .oauthId(this.id)
            .oauthAccessToken(this.accessToken)
            .oauthAccessTokenExpiresAt(this.accessTokenExpiresAt)
            .oauthRefreshToken(this.refreshToken)
            .oauthRefreshTokenExpiresAt(this.refreshTokenExpiresAt)
            .build();
    }

}

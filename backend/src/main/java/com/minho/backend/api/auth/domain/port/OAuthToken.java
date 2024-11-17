package com.minho.backend.api.auth.domain.port;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.ZonedDateTime;

@ToString
@Getter
@Builder
public class OAuthToken {

    private final String accessToken;

    private final String refreshToken;

    private final ZonedDateTime accessTokenExpiresAt;

    private final ZonedDateTime refreshTokenExpiresAt;

    private final String tokenType;

}

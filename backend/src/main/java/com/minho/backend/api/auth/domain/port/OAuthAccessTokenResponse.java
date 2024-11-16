package com.minho.backend.api.auth.domain.port;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@Builder
public class OAuthAccessTokenResponse {

    private final String accessToken;

    private final String refreshToken;

    private final String expiresIn;

    private final String tokenType;

}

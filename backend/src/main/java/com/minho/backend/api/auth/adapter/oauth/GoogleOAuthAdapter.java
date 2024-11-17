package com.minho.backend.api.auth.adapter.oauth;

import com.minho.backend.api.auth.domain.port.OAuthToken;
import com.minho.backend.api.auth.domain.port.OAuthPort;
import com.minho.backend.api.auth.domain.port.OAuthUser;
import com.minho.backend.api.common.AuthType;
import com.minho.backend.config.environment.EnvironmentConfig;
import com.minho.backend.constant.Constant;
import com.minho.backend.exception.ServerException;
import com.minho.backend.util.RestApi;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@AllArgsConstructor
@Component
public class GoogleOAuthAdapter implements OAuthPort {

    private final RestApi restApi;

    @Override
    public String getOAuthPageUrl() {
        String oauthPageUri = Constant.GOOGLE_OAUTH_PAGE_ENDPOINT + "?client_id="
                + EnvironmentConfig.getOauthGoogleClientId() + "&redirect_uri="
                + EnvironmentConfig.getOauthRedirectUrl() + "&response_type=" + "code" + "&scope="
                + "https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/gmail.readonly"
                + "&access_type=" + "offline" + "&prompt=" + "select_account";
        ;

        return oauthPageUri;
    }

    @Override
    public OAuthToken getOAuthToken(String authorizationCode) throws ServerException {
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("client_id", EnvironmentConfig.getOauthGoogleClientId());
        requestBody.put("client_secret", EnvironmentConfig.getOauthGoogleClientSecret());
        requestBody.put("redirect_uri", EnvironmentConfig.getOauthRedirectUrl());
        requestBody.put("grant_type", "authorization_code");
        requestBody.put("code", authorizationCode);

        GoogleAccessTokenResponse response = this.restApi.post(Constant.GOOGLE_OAUTH_ACCESS_TOKEN_ENDPOINT, requestBody,
                GoogleAccessTokenResponse.class);

        log.debug("### access token: {} ###", response.getAccessToken());
        log.debug("### scope: {} ###", response.getScope());

        return OAuthToken.builder()
            .accessToken(response.getAccessToken())
            .refreshToken(response.getRefreshToken())
            .accessTokenExpiresAt(ZonedDateTime.now().plusSeconds(response.getExpiresIn()))
            .refreshTokenExpiresAt(null)
            .tokenType(response.getTokenType())
            .build();

    }

    @Override
    public OAuthUser getOAuthUser(OAuthToken oAuthToken) throws ServerException {
        this.restApi.authenticateHeader("Authorization", "Bearer " + oAuthToken.getAccessToken());
        GoogleUserResponse response = this.restApi.get(Constant.GOOGLE_OAUTH_USER_ENDPOINT, GoogleUserResponse.class);

        return OAuthUser.builder()
            .authType(AuthType.google)
            .id(response.getId())
            .email(response.getEmail())
            .name(response.getName())
            .accessToken(oAuthToken.getAccessToken())
            .accessTokenExpiresAt(oAuthToken.getAccessTokenExpiresAt())
            .refreshToken(oAuthToken.getRefreshToken())
            .refreshTokenExpiresAt(oAuthToken.getRefreshTokenExpiresAt())
            .build();
    }

}

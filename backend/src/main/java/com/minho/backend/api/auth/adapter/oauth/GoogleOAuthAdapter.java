package com.minho.backend.api.auth.adapter.oauth;

import com.minho.backend.api.auth.domain.port.OAuthAccessTokenResponse;
import com.minho.backend.api.auth.domain.port.OAuthPort;
import com.minho.backend.api.auth.domain.port.OAuthUserResponse;
import com.minho.backend.config.environment.EnvironmentConfig;
import com.minho.backend.constant.Constant;
import com.minho.backend.exception.ServerException;
import com.minho.backend.util.RestApi;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

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
    public OAuthAccessTokenResponse getOAuthAccessToken(String authorizationCode) throws ServerException {
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

        return OAuthAccessTokenResponse.builder()
            .accessToken(response.getAccessToken())
            .refreshToken(response.getRefreshToken())
            .expiresIn(response.getExpiresIn())
            .tokenType(response.getTokenType())
            .build();

    }

    @Override
    public OAuthUserResponse getOAuthUser(String accessToken) throws ServerException {
        this.restApi.authenticateHeader("Authorization", "Bearer " + accessToken);
        GoogleUserResponse response = this.restApi.get(Constant.GOOGLE_OAUTH_USER_ENDPOINT, GoogleUserResponse.class);

        System.out.println(response.toString());
        return OAuthUserResponse.builder()
            .id(response.getId())
            .email(response.getEmail())
            .name(response.getName())
            .build();
    }

}

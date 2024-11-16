package com.minho.backend.api.auth.domain.port;

import com.minho.backend.exception.ServerException;

public interface OAuthPort {

    String getOAuthPageUrl();

    OAuthAccessTokenResponse getOAuthAccessToken(String authorizationCode) throws ServerException;

    OAuthUserResponse getOAuthUser(String accessToken) throws ServerException;

}

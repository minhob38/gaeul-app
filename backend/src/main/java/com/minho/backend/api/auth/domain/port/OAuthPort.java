package com.minho.backend.api.auth.domain.port;

import com.minho.backend.exception.ServerException;

public interface OAuthPort {

    String getOAuthPageUrl();

    OAuthToken getOAuthToken(String authorizationCode) throws ServerException;

    OAuthUser getOAuthUser(OAuthToken oAuthToken) throws ServerException;

}

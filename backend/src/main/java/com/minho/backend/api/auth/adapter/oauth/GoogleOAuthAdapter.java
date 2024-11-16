package com.minho.backend.api.auth.adapter.oauth;

import com.minho.backend.api.auth.domain.port.OAuthPort;
import com.minho.backend.config.environment.EnvironmentConfig;
import org.springframework.stereotype.Component;

@Component
public class GoogleOAuthAdapter implements OAuthPort {

    private final String googleOAuthApi = "https://accounts.google.com/o/oauth2/v2/auth";

    @Override
    public String getOAuthPageUrl() {
        String oauthPageUri = this.googleOAuthApi + "?client_id=" + EnvironmentConfig.getOauthGoogleClientId()
                + "&redirect_uri=" + EnvironmentConfig.getOauthRedirectUrl() + "&response_type=" + "code" + "&scope="
                + "https://www.googleapis.com/auth/gmail.readonly";

        return oauthPageUri;
    }

}

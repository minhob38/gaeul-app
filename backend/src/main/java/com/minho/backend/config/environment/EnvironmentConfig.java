package com.minho.backend.config.environment;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EnvironmentConfig {

    private static String environment;

    private static String jwtSecretKey;

    private static String oauthRedirectUrl;

    private static String oauthGoogleClientId;

    private static String oauthGoogleClientSercret;

    @Value("${environment}")
    private String _environment;

    @Value("${jwt.secret-key}")
    private String _jwtSecretKey;

    @Value("${oauth.redirect-url}")
    private String _oauthRedirectUrl;

    @Value("${oauth.google.client-id}")
    private String _oauthGoogleClientId;

    @Value("${oauth.google.client-password}")
    private String _oauthGoogleClientSecret;

    @PostConstruct
    public void init() {
        EnvironmentConfig.environment = this._environment;

        EnvironmentConfig.jwtSecretKey = this._jwtSecretKey;

        EnvironmentConfig.oauthRedirectUrl = this._oauthRedirectUrl;

        EnvironmentConfig.oauthGoogleClientId = this._oauthGoogleClientId;

        EnvironmentConfig.oauthGoogleClientSercret = this._oauthGoogleClientSecret;
    }

    public static String getEnvironment() {
        return EnvironmentConfig.environment;
    }

    public static String getJwtSecretKey() {
        return EnvironmentConfig.jwtSecretKey;
    }

    public static String getOauthGoogleClientId() {
        return EnvironmentConfig.oauthGoogleClientId;
    }

    public static String getOauthGoogleClientSecret() {
        return EnvironmentConfig.oauthGoogleClientSercret;
    }

    public static String getOauthRedirectUrl() {
        return EnvironmentConfig.oauthRedirectUrl;
    }

}

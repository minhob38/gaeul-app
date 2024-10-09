package com.minho.backend.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EnvironmentConfig {

    private static String environment;

    private static String jwtSecretKey;

    @Value("${environment}")
    private String env;

    @Value("${jwt.secret-key}")
    private String secretKey;

    @PostConstruct
    public void init() {
        EnvironmentConfig.environment = env;
        EnvironmentConfig.jwtSecretKey = secretKey;
    }

    public static String getEnvironment() {
        return EnvironmentConfig.environment;
    }

    public static String getJwtSecretKey() {
        return EnvironmentConfig.jwtSecretKey;
    }

}

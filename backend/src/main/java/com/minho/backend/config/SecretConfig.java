package com.minho.backend.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class SecretConfig {

	@Value("${jwt.secret-key}")
	private String jwtSecretKey;
}

package com.minho.backend.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AuthUtil {

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public String encodePassword(String password) {
		return this.bCryptPasswordEncoder.encode(password);
	}

	public Boolean matchPassword(String plainPassword, String encodedPassword) {
		return bCryptPasswordEncoder.matches(plainPassword, encodedPassword);
	}

	public String createJwt(Long userId, Long expireMinutes) {
		Date now = Date.from(Instant.now());
		Date expireAt = new Date(now.getTime() + expireMinutes * 60 * 1000);

		SecretKey key = Keys.hmacShaKeyFor("".getBytes());
		return Jwts.builder().signWith(key).claim("user_id", userId).expiration(expireAt).compact();
	}
}

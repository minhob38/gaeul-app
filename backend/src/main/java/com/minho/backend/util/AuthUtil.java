package com.minho.backend.util;

import com.minho.backend.config.SecretConfig;
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

    @Autowired
    private SecretConfig secretConfig;

    public String encodePassword(String password) {
        return this.bCryptPasswordEncoder.encode(password);
    }

    public Boolean matchPassword(String plainPassword, String encodedPassword) {
        return bCryptPasswordEncoder.matches(plainPassword, encodedPassword);
    }

    public String createJwt(String userKey, Long expireMinutes) {
        Date now = Date.from(Instant.now());
        Date expireAt = new Date(now.getTime() + expireMinutes * 60 * 1000);

        SecretKey secretKey = Keys.hmacShaKeyFor(this.secretConfig.getJwtSecretKey().getBytes());
        return Jwts.builder().signWith(secretKey).claim("user_key", userKey).expiration(expireAt).compact();
    }

}

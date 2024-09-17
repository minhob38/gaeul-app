package com.minho.backend.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class auth {
  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  public String encodePassword(String password) {
    return this.bCryptPasswordEncoder.encode(password);
  }
}

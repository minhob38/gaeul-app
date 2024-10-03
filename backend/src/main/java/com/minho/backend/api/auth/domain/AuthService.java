package com.minho.backend.api.auth.domain;

import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.auth.domain.mapper.AuthDomainMapper;
import com.minho.backend.api.auth.domain.port.AuthPersistencePort;
import com.minho.backend.api.auth.domain.port.AuthServicePort;
import com.minho.backend.exception.AuthException;
import com.minho.backend.util.AuthUtil;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.mapstruct.control.MappingControl.Use;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements AuthServicePort {

  private final AuthPersistencePort userPersistenceAdapter;
  private final AuthDomainMapper authDomainMapper;

  private final AuthUtil authUtil;

  @Override
  public AuthInfo.SignupInfo signup(AuthCommand.SignupCommand command) throws AuthException {
    User user = command.toEntity();

    if (this.userPersistenceAdapter.findUserByEmail(user.getEmail()).isPresent()) {
      throw new AuthException("user already exists");
    }

    String encodedPassword = this.authUtil.encodePassword(user.getPassword());
    user.setPassword(encodedPassword);

    User createdUser = this.userPersistenceAdapter.createUser(user);

    return this.authDomainMapper.toSignupInfo(createdUser);
  }

  @Override
  public AuthInfo.SigninInfo signin(AuthCommand.SigninCommand command) throws AuthException {
    User user = command.toEntity();

    Optional<User> foundUser = this.userPersistenceAdapter.findUserByEmail(user.getEmail());

    if (foundUser.isEmpty()) {
      throw new AuthException("user does not exists");
    }

    String plainPassword = user.getPassword();
    String encodedPassword = foundUser.get().getPassword();
    String key = foundUser.get().getKey();

    Boolean isPasswordMatched = this.authUtil.matchPassword(plainPassword, encodedPassword);

    if (!isPasswordMatched) {
      throw new AuthException("password does not matches");
    }

    String accessToken = this.authUtil.createJwt(key, 15L);

    // TODO: String 대신, JWT Class로 만들기
    return this.authDomainMapper.toSigninInfo(key, accessToken);
  }
}

package com.minho.backend.api.auth.adapter.http;

import com.minho.backend.api.auth.adapter.http.dto.AuthDto.Signup;
import com.minho.backend.api.auth.adapter.http.dto.AuthDto.Signup.Data;
import com.minho.backend.api.auth.adapter.http.mapper.AuthAdapterMapper;
import com.minho.backend.api.auth.application.AuthApplication;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.exception.AuthException;
import com.minho.backend.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping(value = "/api/auth")
@RestController
public class AuthController {

  private final AuthApplication authApplication;
  private final AuthAdapterMapper authAdapterMapper;

  @PostMapping(value = "/signup")
  public ApiResponse<Data> postSignup(@Validated @RequestBody Signup.RequestBody requestBody)
      throws AuthException {
    AuthCommand.SignupCommand command = this.authAdapterMapper.toCommand(requestBody);
    AuthInfo.SignupInfo info = this.authApplication.signup(command);
    Data data = this.authAdapterMapper.toData(info);
    return ApiResponse.success(data);
  }
}

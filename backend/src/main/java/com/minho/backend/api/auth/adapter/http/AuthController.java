package com.minho.backend.api.auth.adapter.http;

import com.minho.backend.api.auth.adapter.http.dto.AuthDto;
import com.minho.backend.api.auth.adapter.http.dto.AuthDto.Signin;
import com.minho.backend.api.auth.adapter.http.dto.AuthDto.Signup;
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
	public ApiResponse<AuthDto.Signup.Data> postSignup(
			@Validated @RequestBody Signup.RequestBody requestBody)
			throws AuthException {
		AuthCommand.SignupCommand command = this.authAdapterMapper.toSignupCommand(requestBody);
		AuthInfo.SignupInfo info = this.authApplication.signup(command);
		AuthDto.Signup.Data data = this.authAdapterMapper.toSignupData(info);
		return ApiResponse.success(data);
	}

	@PostMapping(value = "/signin")
	public ApiResponse<AuthDto.Signin.Data> postSignin(
			@Validated @RequestBody Signin.RequestBody requestBody)
			throws AuthException {
		AuthCommand.SigninCommand command = this.authAdapterMapper.toSigninCommand(requestBody);
		AuthInfo.SigninInfo info = this.authApplication.signin(command);
		AuthDto.Signin.Data data = this.authAdapterMapper.toSigninData(info);
		return ApiResponse.success(data);
	}
}

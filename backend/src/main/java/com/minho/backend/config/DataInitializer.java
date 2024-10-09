package com.minho.backend.config;

import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.auth.domain.port.AuthPersistencePort;
import com.minho.backend.util.AuthUtil;
import java.time.ZonedDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

	private final AuthPersistencePort authPersistenceAdapter;

	private final AuthUtil authUtil;

	@Override
	public void run(String... args) throws Exception {
		System.out.println("### Initializing Data ###");

		String password = this.authUtil.encodePassword("qwerasdf");
		User user = User.builder()
				.key("dysufedgoyafjp0d")
				.email("gaeul@gmail.com")
				.name("gaeul")
				.password(password)
				.passwordChangedAt(ZonedDateTime.now())
				.signedupAt(ZonedDateTime.now())
				.build();

		this.authPersistenceAdapter.createUser(user);

		System.out.println("### Initialized Data ###");
	}
}
package com.minho.backend.config.dataseed;

import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.auth.domain.port.AuthPersistencePort;
import com.minho.backend.api.common.AuthType;
import com.minho.backend.util.AuthUtil;
import java.time.ZonedDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AuthPersistencePort authPersistenceAdapter;

    private final AuthUtil authUtil;

    @Override
    public void run(String... args) throws Exception {
        log.debug("### Initializing Data ###");

        String password = this.authUtil.encodePassword("qwerasdf");
        User user = User.builder()
            .key("dysufedgoyafjp0d")
            .authType(AuthType.conventional)
            .email("gaeul@gmail.com")
            .name("gaeul")
            .password(password)
            .passwordChangedAt(ZonedDateTime.now())
            .signedupAt(ZonedDateTime.now())
            .build();

        this.authPersistenceAdapter.createUser(user);

        log.debug("### Initialized Data ###");
    }

}
package com.minho.backend.api.source.adapter.persistence;

import com.minho.backend.api.source.domain.entity.Mail;
import com.minho.backend.api.source.domain.port.SourcePersistencePort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class SourcePersistenceAdapter implements SourcePersistencePort {

    private final MailJpaRepository mailJpaRepository;

    @Override
    public Mail saveMail(Mail mail) {
        MailJpaEntity mailJpaEntity = mail.toJpaEntity();
        MailJpaEntity createdMailJpaEntity = this.mailJpaRepository.save(mailJpaEntity);
        Mail savedMail = createdMailJpaEntity.toEntity();

        return savedMail;
    }

}

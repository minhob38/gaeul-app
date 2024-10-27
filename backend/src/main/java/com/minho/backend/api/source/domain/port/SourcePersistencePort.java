package com.minho.backend.api.source.domain.port;

import com.minho.backend.api.source.domain.entity.Mail;

public interface SourcePersistencePort {

    Mail saveMail(Mail mail);

}

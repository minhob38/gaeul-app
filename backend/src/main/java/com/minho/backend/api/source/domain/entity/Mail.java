package com.minho.backend.api.source.domain.entity;

import com.minho.backend.api.auth.adapter.persistence.UserJpaEntity;
import com.minho.backend.api.source.adapter.persistence.MailJpaEntity;
import java.time.ZonedDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Builder
@AllArgsConstructor
public class Mail {

    // TODO: 공통 member base entity처럼 빼기
    private Long id;

    private String key;

    private String subject;

    private String content;

    private String sender;

    private ZonedDateTime receivedAt;

    private ZonedDateTime parsedAt;

    private ZonedDateTime createdAt;

    private ZonedDateTime updatedAt;

    private ZonedDateTime trashedAt;

    private ZonedDateTime untrashedAt;

    private ZonedDateTime purgedAt;

    private ZonedDateTime unpurgedAt;

    public MailJpaEntity toJpaEntity() {
        return MailJpaEntity.builder()
            .id(this.id)
            .key(this.key)
            .subject(this.subject)
            .content(this.content)
            .sender(this.sender)
            .receivedAt(this.receivedAt)
            .parsedAt(this.parsedAt)
            .trashedAt(this.trashedAt)
            .untrashedAt(this.untrashedAt)
            .purgedAt(this.purgedAt)
            .unpurgedAt(this.unpurgedAt)
            .createdAt(this.createdAt)
            .updatedAt(this.updatedAt)
            .build();
    }

    public void fetch(String subject, String content) {
        this.subject = subject;
        this.content = content;
    }

}
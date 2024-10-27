package com.minho.backend.api.source.adapter.persistence;

import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.common.BaseEntity;
import com.minho.backend.api.source.domain.entity.Mail;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.ZonedDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@ToString
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "mail")
public class MailJpaEntity extends BaseEntity {

    private String subject;

    private String content;

    private String sender;

    private ZonedDateTime receivedAt;

    private ZonedDateTime parsedAt;

    public Mail toEntity() {
        return Mail.builder()
            .id(this.getId())
            .key(this.getKey())
            .subject(this.subject)
            .sender(this.sender)
            .content(this.content)
            .receivedAt(this.receivedAt)
            .parsedAt(this.parsedAt)
            .trashedAt(this.getTrashedAt())
            .untrashedAt(this.getUntrashedAt())
            .purgedAt(this.getPurgedAt())
            .unpurgedAt(this.getUnpurgedAt())
            .createdAt(this.getCreatedAt())
            .updatedAt(this.getUpdatedAt())
            .build();
    }

}

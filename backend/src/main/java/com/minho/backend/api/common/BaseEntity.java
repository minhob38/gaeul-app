package com.minho.backend.api.common;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import java.time.ZonedDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.apache.commons.lang3.RandomStringUtils;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@SuperBuilder
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "`key`") // TODO: 다른컬럼으로 이름 바꾸기
    private String key;

    @Column(name = "created_at")
    @CreationTimestamp
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private ZonedDateTime updatedAt;

    @PrePersist
    public void generateKey() {
        if (this.key != null) {
            return;
        }

        this.key = RandomStringUtils.randomAlphanumeric(16).toLowerCase();
    }

}

// @Getter
// @MappedSuperclass
// @EntityListeners(AuditingEntityListener.class)
// public class AbstractEntity {
//
// @CreationTimestamp
// private ZonedDateTime createdAt;
//
// @UpdateTimestamp
// private ZonedDateTime updatedAt;
// }

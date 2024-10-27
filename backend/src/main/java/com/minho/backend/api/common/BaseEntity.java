package com.minho.backend.api.common;

import jakarta.persistence.Column;
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

@Getter
@SuperBuilder
@NoArgsConstructor
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

    @Column(name = "trashed_at")
    private ZonedDateTime trashedAt;

    @Column(name = "untrashed_at")
    private ZonedDateTime untrashedAt;

    @Column(name = "purged_at")
    private ZonedDateTime purgedAt;

    @Column(name = "unpurged_at")
    private ZonedDateTime unpurgedAt;

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

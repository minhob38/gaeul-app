package com.minho.backend.api.auth.adapter.persistence;

import com.minho.backend.api.auth.domain.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.time.ZonedDateTime;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.apache.commons.lang3.RandomStringUtils;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@ToString
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class UserJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "`key`") // TODO: 다른컬럼으로 이름 바꾸기
    private String key;

    private String name;

    private String email;

    private String password;

    private ZonedDateTime passwordChangedAt;

    private ZonedDateTime signedupAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date signedinAt;

    private ZonedDateTime signedoutAt;

    @Column(name = "created_at")
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private Date updatedAt;

    @PrePersist
    public void generateKey() {
        if (this.key != null) {
            return;
        }

        this.key = RandomStringUtils.randomAlphanumeric(16).toLowerCase();
    }

    // @Builder
    // public UserJpaEntity(Long id, String email, String password, String key) {
    // this.id = id;
    // this.email = email;
    // this.key = key;
    // this.password = password;
    // }

    public User toEntity() {
        return User.builder()
            .id(this.id)
            .key(this.key)
            .email(this.email)
            .name(this.name)
            .password(this.password)
            .passwordChangedAt(this.passwordChangedAt)
            .signedupAt(this.signedupAt)
            .signedinAt(this.signedinAt)
            .signedoutAt(this.signedoutAt)
            .createdAt(this.createdAt)
            .updatedAt(this.updatedAt)
            .build();
    }

}

package com.minho.backend.api.auth.adapter.persistence;

import com.minho.backend.api.auth.domain.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


@ToString
@Getter
@NoArgsConstructor
@Entity
@Table(name = "user")
public class UserJpaEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String email;

  private String password;

  @Column(name = "created_at")
  @CreationTimestamp
  private Date createdAt;

  @Column(name = "updated_at")
  @UpdateTimestamp
  private Date updatedAt;

  @Builder
  public UserJpaEntity(String email, String password) {
    this.email = email;
    this.password = password;
  }

  public User toEntity() {
    return User
        .builder()
        .id(this.id)
        .email(this.email)
        .password(this.password)
        .build();
  }
}

package com.minho.backend.api.auth.adapter.out.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user")
public class UserJpaEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String email;

  private String password;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_at")
  private Date createdAt;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "updated_at")
  private Date updatedAt;

  @Override
  public String toString() {
    return "id: " + this.getId()
        + "\nemail: " + this.getEmail()
        + "\npassword: " + this.getPassword()
        + "\ncreatedAt: " + this.getCreatedAt()
        + "\nupdatedAt: " + this.getUpdatedAt();
  }
}

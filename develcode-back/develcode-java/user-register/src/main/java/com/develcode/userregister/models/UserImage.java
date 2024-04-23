package com.develcode.userregister.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_image")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserImage {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(name = "image_base64", nullable = false)
  private String imabeBase64;

  @OneToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;
}

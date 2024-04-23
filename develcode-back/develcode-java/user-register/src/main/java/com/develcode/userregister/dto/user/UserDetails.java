package com.develcode.userregister.dto.user;
import java.time.LocalDateTime;

public record UserDetails(
  String code, 
  String name, 
  LocalDateTime birthDate,
  String imabeBase64) {
}
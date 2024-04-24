package com.develcode.userregister.dto.user;

public record UserResponseDTO(
  String code, 
  String name, 
  String birthDate,
  String imageBase64) {
}
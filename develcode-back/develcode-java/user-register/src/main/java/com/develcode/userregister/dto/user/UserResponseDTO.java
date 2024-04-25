package com.develcode.userregister.dto.user;

public record UserResponseDTO(
  String id, 
  String code, 
  String name, 
  String birthDate,
  String imageBase64
) {
}

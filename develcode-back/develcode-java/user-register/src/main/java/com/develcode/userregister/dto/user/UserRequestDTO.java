package com.develcode.userregister.dto.user;

public record UserRequestDTO(
  String id, 
  String code, 
  String name, 
  String birthDate,
  String imageBase64
) {
}

package com.develcode.userregister.dto.user;

public record UserDetails(
  String code, 
  String name, 
  String birthDate,
  String imageBase64) {
}
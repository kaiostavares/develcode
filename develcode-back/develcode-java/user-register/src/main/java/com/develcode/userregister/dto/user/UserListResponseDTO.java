package com.develcode.userregister.dto.user;

import java.util.List;

public record UserListResponseDTO(
  List<UserResponseDTO> users, int total
) { 
}

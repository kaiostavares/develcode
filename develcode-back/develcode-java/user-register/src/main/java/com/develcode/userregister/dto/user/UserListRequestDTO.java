package com.develcode.userregister.dto.user;

import java.util.List;

public record UserListRequestDTO(
  List<UserRequestDTO> users, int total
) { 
}

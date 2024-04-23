package com.develcode.userregister.dto.user;

import java.util.List;

public record UserListDTO(
  List<UserDetails> users
) { 
}

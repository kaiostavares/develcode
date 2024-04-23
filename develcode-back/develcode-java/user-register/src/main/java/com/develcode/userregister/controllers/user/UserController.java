package com.develcode.userregister.controllers.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.develcode.userregister.dto.user.UserListDTO;
import com.develcode.userregister.services.user.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @GetMapping("") 
  public ResponseEntity<UserListDTO> getUsers(){
    return ResponseEntity.ok(userService.getAllUsers());
  } 
}

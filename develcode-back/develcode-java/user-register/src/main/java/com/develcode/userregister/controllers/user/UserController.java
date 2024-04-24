package com.develcode.userregister.controllers.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.develcode.userregister.dto.user.UserDetails;
import com.develcode.userregister.dto.user.UserListDTO;
import com.develcode.userregister.services.user.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
  private final UserService userService;

  @GetMapping("") 
  public ResponseEntity<UserListDTO> getUsers(){
    return ResponseEntity.ok(userService.getAllUsers());
  }

  @PostMapping("/signUp")
  public ResponseEntity createUser(@RequestBody UserDetails body) {      
      this.userService.registerUser(body);
      return ResponseEntity.ok().build();
  }
  
}

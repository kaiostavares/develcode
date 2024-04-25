package com.develcode.userregister.controllers.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.develcode.userregister.dto.user.UserRequestDTO;
import com.develcode.userregister.dto.user.UserResponseDTO;
import com.develcode.userregister.dto.user.UserListResponseDTO;
import com.develcode.userregister.services.user.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
  private final UserService userService;

  @GetMapping("") 
  public ResponseEntity<UserListResponseDTO> getUsers(
      @RequestParam(defaultValue = "0") int pageIndex,
      @RequestParam(defaultValue = "") String query)
    {
      return ResponseEntity.ok(userService.getAllUsers(pageIndex, query));
  }

  @GetMapping("/{userId}")
  public ResponseEntity<UserResponseDTO> getUserById(@PathVariable String userId) {
    UserResponseDTO user = userService.getUserWithImg(userId);
    return ResponseEntity.ok(user);
  }
  

  @PostMapping("/signUp")
  public ResponseEntity createUser(@RequestBody UserRequestDTO body) {      
      this.userService.registerUser(body);
      return ResponseEntity.ok().build();
  }

  @PutMapping("/{userId}/update")
  public ResponseEntity updateUser(@PathVariable String userId, @RequestBody UserRequestDTO body) {      
      this.userService.updateUser(userId, body);
      return ResponseEntity.ok().build();
  }
  
}

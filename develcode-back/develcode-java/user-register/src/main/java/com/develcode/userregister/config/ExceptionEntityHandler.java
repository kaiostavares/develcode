package com.develcode.userregister.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.develcode.userregister.exceptions.user.UserAlreadyExistsException;
import com.develcode.userregister.exceptions.user.UserNotFoundException;

@ControllerAdvice
public class ExceptionEntityHandler {
  @ExceptionHandler(UserAlreadyExistsException.class)
  public ResponseEntity handleUserAlreadyExists(UserAlreadyExistsException exception){
    return ResponseEntity.status(HttpStatus.CONFLICT).build();
  }

  @ExceptionHandler(UserNotFoundException.class)
  public ResponseEntity handleUserNotFoun(UserNotFoundException exception){
    return ResponseEntity.notFound().build();
  }
}
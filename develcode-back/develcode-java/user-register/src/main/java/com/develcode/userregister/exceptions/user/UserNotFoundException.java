package com.develcode.userregister.exceptions.user;

public class UserNotFoundException extends RuntimeException{
  public UserNotFoundException(String message){
    super(message);
  }
}

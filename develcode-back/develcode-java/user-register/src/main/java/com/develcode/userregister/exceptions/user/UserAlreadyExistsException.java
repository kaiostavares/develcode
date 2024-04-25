package com.develcode.userregister.exceptions.user;

public class UserAlreadyExistsException extends RuntimeException{
  public UserAlreadyExistsException(String message){
    super(message);
  }
}

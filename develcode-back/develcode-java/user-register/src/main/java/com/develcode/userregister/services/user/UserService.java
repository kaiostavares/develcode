package com.develcode.userregister.services.user;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.develcode.userregister.dto.user.UserDetails;
import com.develcode.userregister.dto.user.UserListDTO;
import com.develcode.userregister.exceptions.user.UserAlreadyExistsException;
import com.develcode.userregister.models.User;
import com.develcode.userregister.models.UserImage;
import com.develcode.userregister.repositories.UserImageRespository;
import com.develcode.userregister.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserImageRespository userImageRespository;
  private final UserRepository userRepository;

  public UserListDTO getAllUsers(){
    List<UserImage> userImageList = this.userImageRespository.findAll();
    List<UserDetails> userDetailsLits = userImageList.stream().map(userWithImage ->{
      return new UserDetails(
        userWithImage.getUser().getCode(), 
        userWithImage.getUser().getUserName(),
        userWithImage.getUser().getBirthDate().toString(), 
        userWithImage.getImabeBase64()
      );
    }).toList();
    return new UserListDTO(userDetailsLits);
  }

  private void verifyUserExists(String code){
    if(this.userRepository.findByCode(code).isPresent()) throw new UserAlreadyExistsException("User with code " + code + " already exists");
  }

  public void registerUser(UserDetails userDetails){
    this.verifyUserExists(userDetails.code());
    User newUser = new User();
    newUser.setCode(userDetails.code());
    newUser.setBirthDate(LocalDate.parse(userDetails.birthDate()));
    newUser.setCreatedAt(LocalDateTime.now());
    newUser.setUserName(userDetails.name());
    this.userRepository.save(newUser);
    UserImage newUserImage = new UserImage();
    newUserImage.setImabeBase64(userDetails.imageBase64());
    newUserImage.setUser(newUser);
    this.userImageRespository.save(newUserImage);
  }
}
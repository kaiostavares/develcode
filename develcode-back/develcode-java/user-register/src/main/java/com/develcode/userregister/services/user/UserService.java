package com.develcode.userregister.services.user;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.develcode.userregister.dto.user.UserRequestDTO;
import com.develcode.userregister.dto.user.UserListResponseDTO;
import com.develcode.userregister.dto.user.UserResponseDTO;
import com.develcode.userregister.exceptions.user.UserAlreadyExistsException;
import com.develcode.userregister.exceptions.user.UserNotFoundException;
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

  public UserListResponseDTO getAllUsers(int page, String query){
    List<UserImage> userImageList = this.userImageRespository.findAll();
    if (query != null && !query.isEmpty()) {
      userImageList = userImageList.stream()
              .filter(userWithImage -> userWithImage.getUser().getUserName().toLowerCase().contains(query.toLowerCase()))
              .toList();
  }
    List<UserImage> paginatedUserWithImages = userImageList.stream()
      .skip(page * 10)
      .limit(10)
      .toList();   
    List<UserResponseDTO> userDetailsLits = paginatedUserWithImages.stream().map(userWithImage ->{
      return new UserResponseDTO(
        userWithImage.getUser().getId(),
        userWithImage.getUser().getCode(), 
        userWithImage.getUser().getUserName(),
        userWithImage.getUser().getBirthDate().toString(), 
        userWithImage.getImabeBase64()
      );
    }).toList();
    return new UserListResponseDTO(userDetailsLits, userImageList.size());
  }


  public UserResponseDTO getUserWithImg(String userId){
    UserImage userImage = getUserWithImgById(userId);
    return new UserResponseDTO(
      userImage.getUser().getId(), 
      userImage.getUser().getCode(), 
      userImage.getUser().getUserName(), 
      userImage.getUser().getBirthDate().toString(), 
      userImage.getImabeBase64());
  }

  private UserImage getUserWithImgById(String userId){
    return this.userImageRespository.findByUserId(userId).orElseThrow(()->new UserNotFoundException("User with id " + userId + " not exists!"));
  }



  private void verifyUserExists(String code){
    if(this.userRepository.findByCode(code).isPresent()) throw new UserAlreadyExistsException("User with code " + code + " already exists");
  }

  public void registerUser(UserRequestDTO userDetails){
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

  public void updateUser(String userId, UserRequestDTO userDetails){
    UserImage userImage = getUserWithImgById(userId);
    if(!userDetails.code().equals(userImage.getUser().getCode()) && !userDetails.code().isEmpty()){
      this.verifyUserExists(userDetails.code());
      userImage.getUser().setCode(userDetails.code());
    }
    if(!userDetails.name().isEmpty()){
      userImage.getUser().setUserName(userDetails.name());
    }

    if(!userDetails.imageBase64().isEmpty()){
      userImage.setImabeBase64(userDetails.imageBase64());
    }
    if(!userDetails.birthDate().isEmpty()){
      userImage.getUser().setBirthDate(LocalDate.parse(userDetails.birthDate()));
    }
    this.userImageRespository.save(userImage);
  }
}
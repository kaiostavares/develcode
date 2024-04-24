package com.develcode.userregister.services.user;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.develcode.userregister.dto.user.UserResponseDTO;
import com.develcode.userregister.dto.user.UserListRequestDTO;
import com.develcode.userregister.dto.user.UserRequestDTO;
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

  public UserListRequestDTO getAllUsers(int page, String query){
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
    List<UserRequestDTO> userDetailsLits = paginatedUserWithImages.stream().map(userWithImage ->{
      return new UserRequestDTO(
        userWithImage.getUser().getId(),
        userWithImage.getUser().getCode(), 
        userWithImage.getUser().getUserName(),
        userWithImage.getUser().getBirthDate().toString(), 
        userWithImage.getImabeBase64()
      );
    }).toList();
    return new UserListRequestDTO(userDetailsLits, userDetailsLits.size());
  }

  private void verifyUserExists(String code){
    if(this.userRepository.findByCode(code).isPresent()) throw new UserAlreadyExistsException("User with code " + code + " already exists");
  }

  public void registerUser(UserResponseDTO userDetails){
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
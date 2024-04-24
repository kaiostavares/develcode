package com.develcode.userregister.services.user;
import java.util.List;

import org.springframework.stereotype.Service;

import com.develcode.userregister.dto.user.UserDetails;
import com.develcode.userregister.dto.user.UserListDTO;
import com.develcode.userregister.models.UserImage;
import com.develcode.userregister.repositories.UserImageRespository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserImageRespository userImageRespository;

  public UserListDTO getAllUsers(){
    List<UserImage> userImageList = this.userImageRespository.findAll();
    List<UserDetails> userDetailsLits = userImageList.stream().map(userWithImage ->{
      return new UserDetails(
        userWithImage.getUser().getCode(), 
        userWithImage.getUser().getUserName(),
        userWithImage.getUser().getBirthDate(), 
        userWithImage.getImabeBase64()
      );
    }).toList();
    return new UserListDTO(userDetailsLits);
  }
}

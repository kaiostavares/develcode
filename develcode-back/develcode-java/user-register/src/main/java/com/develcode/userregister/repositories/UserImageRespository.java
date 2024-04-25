package com.develcode.userregister.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.develcode.userregister.models.UserImage;

public interface UserImageRespository extends JpaRepository<UserImage, String> {
  Optional<UserImage> findByUserId(String id);
}

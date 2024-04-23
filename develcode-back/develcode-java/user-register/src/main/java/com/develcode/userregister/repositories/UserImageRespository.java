package com.develcode.userregister.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.develcode.userregister.models.UserImage;

public interface UserImageRespository extends JpaRepository<UserImage, String> {
}

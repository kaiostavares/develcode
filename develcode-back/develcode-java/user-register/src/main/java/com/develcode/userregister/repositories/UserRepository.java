package com.develcode.userregister.repositories;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.develcode.userregister.models.User;

public interface UserRepository extends JpaRepository<User, String>{
  Optional<User> findByCode(String code);
}
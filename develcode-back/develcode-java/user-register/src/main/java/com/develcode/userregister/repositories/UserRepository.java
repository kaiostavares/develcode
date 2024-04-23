package com.develcode.userregister.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.develcode.userregister.models.User;
public interface UserRepository extends JpaRepository<User, String>{

}
package com.youricsoft.houmain.repository;

import org.springframework.data.repository.CrudRepository;

import com.youricsoft.houmain.model.User;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
}

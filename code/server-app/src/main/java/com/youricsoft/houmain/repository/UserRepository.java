package com.youricsoft.houmain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.youricsoft.houmain.model.User;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
    
    @Query(value=
    		" SELECT user" + 
    		" from User user inner join UserRole userRole on " + 
    		" user.id = userRole.userId " + 
    		" inner join Role role on userRole.roleId = role.id " + 
    		" where role.roleName = ?1")
    public List<User> findAllByRole(String role);
}

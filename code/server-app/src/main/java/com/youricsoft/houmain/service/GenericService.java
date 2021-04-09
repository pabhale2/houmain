package com.youricsoft.houmain.service;

import java.util.List;
import java.util.Optional;

import com.youricsoft.houmain.dto.RegistrationDTO;
import com.youricsoft.houmain.model.ContactEntity;
import com.youricsoft.houmain.model.Owner;
import com.youricsoft.houmain.model.Property;
import com.youricsoft.houmain.model.Role;
import com.youricsoft.houmain.model.User;
import com.youricsoft.houmain.model.UserRole;

public interface GenericService {
    User findByUsername(String username);
    Optional<User> findById(long id);
    List<User> findAllUsers();
    User saveUser(User user);
    List<Role> findAllRoles();
    UserRole saveUserRole(UserRole userRole);
    ContactEntity saveContact(ContactEntity contact);
    Owner disableOwner(Owner owner);
	User registerUser(RegistrationDTO registrationDTO);
}

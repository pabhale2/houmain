package com.youricsoft.houmain.service;

import java.util.List;

import com.youricsoft.houmain.dto.RegistrationDTO;
import com.youricsoft.houmain.model.ContactEntity;
import com.youricsoft.houmain.model.Owner;
import com.youricsoft.houmain.model.Property;
import com.youricsoft.houmain.model.Role;
import com.youricsoft.houmain.model.User;
import com.youricsoft.houmain.model.UserRole;

public interface GenericService {
    User findByUsername(String username);
    List<User> findAllUsers();
    User saveUser(User user);
    List<Role> findAllRoles();
    UserRole saveUserRole(UserRole userRole);
    ContactEntity saveContact(ContactEntity contact);
    Owner saveOwner(Owner Owner);
	Owner findbyId(long id);
	List<Owner> findAllOwners();
	Owner disableOwner(Owner owner);
	Property saveProperty(Property property);
	Property findbyIdProperty(long id);
	List<Property> findAllProperties();
	User registerUser(RegistrationDTO registrationDTO);
}

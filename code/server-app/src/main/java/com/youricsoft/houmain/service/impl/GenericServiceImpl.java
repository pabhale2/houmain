package com.youricsoft.houmain.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youricsoft.houmain.model.ContactEntity;
import com.youricsoft.houmain.model.Role;
import com.youricsoft.houmain.model.User;
import com.youricsoft.houmain.model.UserRole;
import com.youricsoft.houmain.model.Owner;
import com.youricsoft.houmain.model.Property;
import com.youricsoft.houmain.repository.ContactRepository;
import com.youricsoft.houmain.repository.RoleRepository;
import com.youricsoft.houmain.repository.UserRepository;
import com.youricsoft.houmain.repository.UserRoleRepository;
import com.youricsoft.houmain.repository.OwnerRepository;
import com.youricsoft.houmain.repository.PropertyRepository;
import com.youricsoft.houmain.service.GenericService;

@Service
public class GenericServiceImpl implements GenericService {
	
	@Resource 
    private UserRepository userRepository;

	@Resource
    private RoleRepository roleRepository;
    
	@Resource
    private UserRoleRepository userRoleRepository;
    
	@Resource
    private ContactRepository contactRepository;
    
	@Resource
    private OwnerRepository ownerRepository;
	
	@Resource
	private PropertyRepository propertyRepository;
    
    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    @Override
    public List<User> findAllUsers() {
        return (List<User>)userRepository.findAll();
    }

	@Override
	public User saveUser(User user) {
		User savedUser = userRepository.save(user);
		List<Role> roleList = findAllRoles();
		UserRole userRole  =new UserRole();
		userRole.setRoleId(roleList.get(0).getId());
		userRole.setUserId(savedUser.getId());
		UserRole savedRole = saveUserRole(userRole);
		savedRole.setRoleId(savedRole.getRoleId());
		
		// TODO : send mail functionality implementation 
		return savedUser;
	}
	
	@Override
	public List<Role> findAllRoles() {
		return (List<Role>)roleRepository.findAll();
	}
	
	@Override
	public UserRole saveUserRole(UserRole userRole) {
		return userRoleRepository.save(userRole);
	}

	@Override
	public ContactEntity saveContact(ContactEntity contact) {
		return contactRepository.save(contact);
	}

	@Override
	public Owner findbyId(long id) {
		Optional<Owner> returnedOwner = ownerRepository.findById(id);
//		return returnedOwner.get();
		return returnedOwner.isPresent() ? returnedOwner.get() : null;
    }

	@Override
	public Owner saveOwner(Owner Owner) {
		ownerRepository.save(Owner);
		return Owner;
	}

	@Override
	public List<Owner> findAllOwners() {
		List<Owner> owners = new ArrayList();
		ownerRepository.findAll().forEach(owners::add);
		return owners;
    }

	@Override
	public Owner disableOwner(Owner owner) {
		owner.setStatus(0);
		ownerRepository.save(owner);
		return owner;
	}

	@Override
	public Property saveProperty(Property property) {
		// TODO Auto-generated method stub
		propertyRepository.save(property);
		return property;
	}

	@Override
	public Property findbyIdProperty(long id) {
		Optional<Property> returnedProperty = propertyRepository.findById(id);
		return returnedProperty.isPresent() ? returnedProperty.get() : null;
	}

	@Override
	public List<Property> findAllProperties() {
		List<Property> properties = new ArrayList();
		propertyRepository.findAll()
		.forEach(properties::add);
		return properties;
	}

	
	
	

}
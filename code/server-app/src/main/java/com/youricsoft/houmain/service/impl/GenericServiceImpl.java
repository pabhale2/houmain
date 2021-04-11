package com.youricsoft.houmain.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.youricsoft.houmain.dto.RegistrationDTO;
import com.youricsoft.houmain.enums.RoleEnum;
import com.youricsoft.houmain.mapper.OwnerMapper;
import com.youricsoft.houmain.mapper.TenantMapper;
import com.youricsoft.houmain.model.ContactEntity;
import com.youricsoft.houmain.model.Role;
import com.youricsoft.houmain.model.Tenant;
import com.youricsoft.houmain.model.User;
import com.youricsoft.houmain.model.UserRole;
import com.youricsoft.houmain.model.Owner;
import com.youricsoft.houmain.model.Property;
import com.youricsoft.houmain.model.PropertyUnit;
import com.youricsoft.houmain.repository.ContactRepository;
import com.youricsoft.houmain.repository.RoleRepository;
import com.youricsoft.houmain.repository.UserRepository;
import com.youricsoft.houmain.repository.UserRoleRepository;
import com.youricsoft.houmain.repository.OwnerRepository;
import com.youricsoft.houmain.repository.PropertyRepository;
import com.youricsoft.houmain.service.GenericService;
import com.youricsoft.houmain.service.OwnerService;
import com.youricsoft.houmain.service.TenantService;

@Service
public class GenericServiceImpl implements GenericService {
	
	@Resource private UserRepository userRepository;
	@Resource private RoleRepository roleRepository;    
	@Resource private UserRoleRepository userRoleRepository;
	@Resource private ContactRepository contactRepository;
	@Resource private OwnerRepository ownerRepository;
	
	@Resource private OwnerService ownerService;
	@Resource private TenantService tenantService;
	
    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    @Transactional
    public void invokeTest() {
    	User user = new User();
    	user.setFirstName("awe2r");
    	user.setLastName("abhale");
    	user.setUsername("username2@gmail.com");
    	user.setPassword("123456");
    	user.setUserStatus(true);
    	userRepository.save(user);
    	throw new RuntimeException("Exception throws rollback ");	
    }
    
    @Override
    public List<User> findAllUsers() {
        return (List<User>)userRepository.findAll();
    }

	@Override
	public User saveUser(User user) {
		User savedUser = userRepository.save(user);
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
	public Optional<User> findById(long id) {
		return userRepository.findById(id);
    }

	@Override
	public Owner disableOwner(Owner owner) {
		owner.setStatus(0);
		ownerRepository.save(owner);
		return owner;
	}

	@Override
	@Transactional
	public User registerUser(RegistrationDTO registrationDTO) {
		User user = new User();
		user.setFirstName(registrationDTO.getFirstName());
		user.setLastName(registrationDTO.getLastName());
		user.setUsername(registrationDTO.getUserName());
		user.setPassword(registrationDTO.getPassword());
		user.setUserStatus(true);
		user.setRoles(new ArrayList<Role>());
		Role role = new Role();
		role.setId(registrationDTO.getType().getId());
		role.setRoleName(registrationDTO.getType().getValue());
		user.getRoles().add(role);
		User savedUser = saveUser(user);
		if(savedUser!=null) {
			if(RoleEnum.OWNER.equals(registrationDTO.getType())) {
				Owner owner = OwnerMapper.INSTANCE.registrationDTOtoOwner(registrationDTO);
				owner.setPrimaryEmail(user.getUsername());
				owner.setStatus(1);
				owner.setUser(user);
				ownerService.save(owner);
			} else if(RoleEnum.TENANT.equals(registrationDTO.getType())) {
				Tenant tenant = TenantMapper.INSTANCE.registrationDTOToTenant(registrationDTO);
				tenant.setUser(savedUser);
				tenantService.save(tenant);
			}
		}
		return savedUser;
	}

	@Override
	public List<User> findAllByRole(RoleEnum role) {
		return userRepository.findAllByRole(role.getValue());
	}

}

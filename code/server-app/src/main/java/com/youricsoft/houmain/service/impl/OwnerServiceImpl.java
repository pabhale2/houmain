package com.youricsoft.houmain.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.youricsoft.houmain.dto.OwnerDTO;
import com.youricsoft.houmain.enums.RoleEnum;
import com.youricsoft.houmain.mapper.OwnerMapper;
import com.youricsoft.houmain.model.Owner;
import com.youricsoft.houmain.model.Role;
import com.youricsoft.houmain.model.User;
import com.youricsoft.houmain.model.UserRole;
import com.youricsoft.houmain.repository.OwnerRepository;
import com.youricsoft.houmain.service.GenericService;
import com.youricsoft.houmain.service.OwnerService;

@Service
public class OwnerServiceImpl implements OwnerService {
	@Resource OwnerRepository ownerRepository;
	@Resource GenericService genericService;
	
	@Override
	public Optional<Owner> findById(long id) {
		return ownerRepository.findByUserId(id);
	}
	
	@Override
	public Owner save(Owner owner) {
		return ownerRepository.save(owner);
	}
	
	@Override
	public Optional<Owner> findByPrimaryEmail(String primaryEmail) {
		return Optional.ofNullable(ownerRepository.findByPrimaryEmail(primaryEmail));
	}

	@Override
	@Transactional
	public Owner registerOwner(OwnerDTO ownerDTO) {
		Owner owner = OwnerMapper.INSTANCE.ownerDTOTOOwner(ownerDTO);
		User user = OwnerMapper.INSTANCE.registrationDTOToUser(ownerDTO);
		user.setUserStatus(true);
		//ToDo :: share the login details with user and change to random password
		user.setPassword("123456");
		user.setRoles(new ArrayList<Role>());
		
		Role role = new Role();
		role.setId(RoleEnum.OWNER.getId());
		role.setRoleName(RoleEnum.OWNER.getValue());
		user.getRoles().add(role);
		User savedUser = genericService.saveUser(user);
		
		if(savedUser!=null && savedUser.getId()>0) {
			owner.setStatus(1);
			owner.setUser(savedUser);
			//owner.setUserId(savedUser.getId());
			return save(owner);
		}
		return owner;
		
	}
	
	@Override
	public List<Owner> findAll() {
		List<Owner> owners = new ArrayList();
		ownerRepository.findAll().forEach(owners::add);
		return owners;
    }
	
	
}

package com.youricsoft.houmain.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youricsoft.houmain.dto.TenantDTO;
import com.youricsoft.houmain.enums.RoleEnum;
import com.youricsoft.houmain.mapper.OwnerMapper;
import com.youricsoft.houmain.mapper.TenantMapper;
import com.youricsoft.houmain.model.Owner;
import com.youricsoft.houmain.model.Role;
import com.youricsoft.houmain.model.Tenant;
import com.youricsoft.houmain.model.User;
import com.youricsoft.houmain.model.UserRole;
import com.youricsoft.houmain.repository.TenantRepository;
import com.youricsoft.houmain.service.GenericService;
import com.youricsoft.houmain.service.TenantService;

@Service
public class TenantServiceImpl implements TenantService {
	@Resource TenantRepository tenantRepository;
	@Resource GenericService genericService;
	
	@Override
	public Optional<Tenant> findById(long id) {
		return tenantRepository.findById(id);
	}
	
	@Override
	public Tenant save(Tenant tenant) {
		return tenantRepository.save(tenant);
	}
	
	@Override
	public Optional<Tenant> findByUserId(long userId){
		return tenantRepository.findByUserId(userId);
	}
	
	@Override
	public Tenant registerTenant(TenantDTO tenantDTO) {
		Tenant tenant = TenantMapper.INSTANCE.tenantDTOtoTenant(tenantDTO);
		User user = TenantMapper.INSTANCE.tenantDTOToUser(tenantDTO);
		user.setUserStatus(true);
		//user.setPassword(String.join("_", tenantDTO.getFirstName()));
		//ToDo :: share the login details with user and change to random password
		user.setPassword("123456");
		user.setUserStatus(true);
		user.setRoles(new ArrayList<Role>());
		Role role = new Role();
		role.setId(RoleEnum.TENANT.getId());
		role.setRoleName(RoleEnum.TENANT.getValue());
		user.getRoles().add(role);
		User savedUser = genericService.saveUser(user);
		
		if(savedUser!=null && savedUser.getId()>0) {
			tenant.setUser(savedUser);
			return save(tenant);
		}
		return tenant;
	}

	@Override
	public List<Tenant> getAll() {
		List<Tenant> list = new ArrayList<Tenant>();
		Iterable<Tenant> iterable = tenantRepository.findAll();
		if(iterable!=null) {
			tenantRepository.findAll().forEach(obj -> list.add(obj));
		}
		return list;
	}
	
	
}

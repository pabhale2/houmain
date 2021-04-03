package com.youricsoft.houmain.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youricsoft.houmain.model.Tenant;
import com.youricsoft.houmain.repository.TenantRepository;
import com.youricsoft.houmain.service.TenantService;

@Service
public class TenantServiceImpl implements TenantService {
	@Resource TenantRepository tenantRepository;
	@Override
	public Tenant save(Tenant tenant) {
		return tenantRepository.save(tenant);
	}

}

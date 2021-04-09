package com.youricsoft.houmain.service;

import java.util.List;
import java.util.Optional;

import com.youricsoft.houmain.dto.TenantDTO;
import com.youricsoft.houmain.model.Tenant;

public interface TenantService {
	public Tenant save(Tenant tenant);
	public Optional<Tenant> findById(long id);
	public Optional<Tenant> findByUserId(long id);
	public Tenant registerTenant(TenantDTO tenantDTO);
	public List<Tenant> getAll();
}

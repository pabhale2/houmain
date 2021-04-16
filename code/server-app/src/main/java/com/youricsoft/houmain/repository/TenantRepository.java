package com.youricsoft.houmain.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.youricsoft.houmain.model.Tenant;

public interface TenantRepository extends CrudRepository<Tenant, Long> {
	Optional<Tenant> findByUserId(long userId);
}

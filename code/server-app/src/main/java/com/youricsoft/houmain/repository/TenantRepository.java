package com.youricsoft.houmain.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.youricsoft.houmain.model.Tenant;

@Repository
public interface TenantRepository extends CrudRepository<Tenant, Long> {
	Optional<Tenant> findByUserId(long userId);
}

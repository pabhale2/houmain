package com.youricsoft.houmain.repository;

import com.youricsoft.houmain.model.Owner;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OwnerRepository extends CrudRepository<Owner, Long> {
	
	
	
	// List<owner> findAllOwners();
}

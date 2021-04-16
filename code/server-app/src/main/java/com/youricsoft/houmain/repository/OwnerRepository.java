package com.youricsoft.houmain.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.youricsoft.houmain.model.Owner;

public interface OwnerRepository extends CrudRepository<Owner, Long> {

	Owner findByPrimaryEmail(String primaryEmail);

	Optional<Owner> findByUserId(long id);

	// List<owner> findAllOwners();
}

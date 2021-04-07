package com.youricsoft.houmain.repository;

import com.youricsoft.houmain.model.Owner;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OwnerRepository extends CrudRepository<Owner, Long> {

	Owner findByPrimaryEmail(String primaryEmail);

	Optional<Owner> findByUserId(long id);

	// List<owner> findAllOwners();
}

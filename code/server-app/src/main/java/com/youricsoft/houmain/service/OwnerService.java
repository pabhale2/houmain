package com.youricsoft.houmain.service;

import java.util.List;
import java.util.Optional;

import com.youricsoft.houmain.dto.OwnerDTO;
import com.youricsoft.houmain.model.Owner;

public interface OwnerService {
	public Optional<Owner> findById(long id);
	public Owner save(Owner owner);
	public Optional<Owner> findByPrimaryEmail(String primaryEmail);
	public Owner registerOwner(OwnerDTO ownerDTO);
	public List<Owner> findAll();
}

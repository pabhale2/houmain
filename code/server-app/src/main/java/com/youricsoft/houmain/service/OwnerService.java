package com.youricsoft.houmain.service;

import java.util.Optional;

import com.youricsoft.houmain.dto.OwnerDTO;
import com.youricsoft.houmain.model.Owner;

public interface OwnerService {
	public Owner save(Owner owner);
	public Optional<Owner> findByPrimaryEmail(String primaryEmail);
	public Owner registerOwner(OwnerDTO ownerDTO);
}

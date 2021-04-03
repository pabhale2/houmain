package com.youricsoft.houmain.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youricsoft.houmain.model.Owner;
import com.youricsoft.houmain.repository.OwnerRepository;
import com.youricsoft.houmain.service.OwnerService;

@Service
public class OwnerServiceImpl implements OwnerService {
	@Resource OwnerRepository ownerRepository;
	@Override
	public Owner save(Owner owner) {
		return ownerRepository.save(owner);
	}
	
}

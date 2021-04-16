package com.youricsoft.houmain.service.impl;

import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youricsoft.houmain.model.PropertyType;
import com.youricsoft.houmain.model.Services;
import com.youricsoft.houmain.repository.PropertyRepository;
import com.youricsoft.houmain.repository.PropertyServiceRequestRepository;
import com.youricsoft.houmain.repository.PropertyTypeRepository;
import com.youricsoft.houmain.repository.ServiceRepository;
import com.youricsoft.houmain.service.MaintainanceServices;

@Service
public class MaintaincnceServiceImpl implements MaintainanceServices {
	@Resource ServiceRepository serviceRepository;
	@Resource PropertyServiceRequestRepository propertyServiceRequestRepository;
	@Resource PropertyTypeRepository propertyTypeRepository;
	
	@Override
	public List<Services> findTypeId(long typeId) {
		Optional<PropertyType> propertyType = propertyTypeRepository.findById(typeId);
		if(propertyType.isPresent()) {
			return serviceRepository.findAllByPropertyType(propertyType.get());
		} else {
			throw new RuntimeException("No Property Found with Type Id " + typeId);
		}
	}
	
}

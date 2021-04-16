package com.youricsoft.houmain.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youricsoft.houmain.dto.PropertyServiceRequestDTO;
import com.youricsoft.houmain.enums.ServiceStatusEnum;
import com.youricsoft.houmain.model.PropertyServiceRequest;
import com.youricsoft.houmain.model.PropertyType;
import com.youricsoft.houmain.model.Services;
import com.youricsoft.houmain.repository.PropertyServiceRequestRepository;
import com.youricsoft.houmain.repository.PropertyTypeRepository;
import com.youricsoft.houmain.repository.ServiceRepository;
import com.youricsoft.houmain.service.MaintainanceServices;

import ch.qos.logback.core.status.Status;

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

	@Override
	public List<PropertyServiceRequest> createPropertyServiceRequest(PropertyServiceRequestDTO propertyServiceRequestDTO) {
		List<PropertyServiceRequest> propertyServiceRequest = new ArrayList<PropertyServiceRequest>();
		for(long serviceId : propertyServiceRequestDTO.getServiceId()) {
			PropertyServiceRequest serviceRequest = new PropertyServiceRequest();
			serviceRequest.setPropertyId(propertyServiceRequestDTO.getPropertyId());
			serviceRequest.setService(new Services(serviceId));
			serviceRequest.setComment(propertyServiceRequestDTO.getComment());
			serviceRequest.setStatus(ServiceStatusEnum.CREATED.getValue());
			serviceRequest = propertyServiceRequestRepository.save(serviceRequest);
			propertyServiceRequest.add(serviceRequest);
		}
		return propertyServiceRequest;
	}

	@Override
	public List<PropertyServiceRequest> findALlServiceRequestByStatus(ServiceStatusEnum serviceStatusEnum) {
		return propertyServiceRequestRepository.findAllServiceRequestByStatus(serviceStatusEnum.getValue());
	}
	
}

package com.youricsoft.houmain.service;

import java.util.List;

import com.youricsoft.houmain.dto.PropertyServiceRequestDTO;
import com.youricsoft.houmain.enums.ServiceStatusEnum;
import com.youricsoft.houmain.model.PropertyServiceRequest;
import com.youricsoft.houmain.model.Services;

public interface MaintainanceServices {
	public List<Services> findTypeId(long typeId);
	public List<PropertyServiceRequest> createPropertyServiceRequest(PropertyServiceRequestDTO propertyServiceRequestDTO);
	public List<PropertyServiceRequest> findALlServiceRequestByStatus(ServiceStatusEnum serviceStatusEnum);
}

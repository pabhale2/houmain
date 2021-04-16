package com.youricsoft.houmain.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.youricsoft.houmain.model.PropertyServiceRequest;

public interface PropertyServiceRequestRepository extends CrudRepository<PropertyServiceRequest, Long> {
	public List<PropertyServiceRequest> findAllServiceRequestByStatus(String status); 
}

package com.youricsoft.houmain.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.youricsoft.houmain.model.PropertyOwnerMapping;

@Repository
public interface PropertyOwnerMappingRepository  extends CrudRepository<PropertyOwnerMapping, Long>{
	
}

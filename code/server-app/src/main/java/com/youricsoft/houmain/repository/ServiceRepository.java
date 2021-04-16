package com.youricsoft.houmain.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.youricsoft.houmain.model.PropertyType;
import com.youricsoft.houmain.model.Services;

public interface ServiceRepository extends CrudRepository<Services, Long> {
	public List<Services> findAllByPropertyType(PropertyType property);
}

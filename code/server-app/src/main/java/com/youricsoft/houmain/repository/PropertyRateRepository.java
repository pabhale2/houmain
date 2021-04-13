package com.youricsoft.houmain.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.youricsoft.houmain.model.PropertyRate;

@Repository
public interface PropertyRateRepository extends CrudRepository<PropertyRate, Long> {

}

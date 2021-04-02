package com.youricsoft.houmain.repository;

import org.springframework.data.repository.CrudRepository;

import com.youricsoft.houmain.model.ContactEntity;

public interface ContactRepository extends CrudRepository<ContactEntity, Long> {
	
}

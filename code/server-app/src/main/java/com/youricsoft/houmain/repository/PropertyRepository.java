package com.youricsoft.houmain.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.youricsoft.houmain.dto.PropertyDTO;
import com.youricsoft.houmain.model.Property;

public interface PropertyRepository extends CrudRepository<Property, Long> {
	
	Iterable<Property> findAll(Pageable pageable);
	
	@Query(value =  
			" select new com.youricsoft.houmain.dto.PropertyDTO(" + 
			"    prop.propertyId, " + 
			"    prop.propertyName, " + 
			"    prop.lat, " + 
			"    prop.lng, " + 
			"    prop.status, " + 
			"    prop.propertyDescription, " + 
			"    prop.address, " + 
			"    prop.city, " + 
			"    prop.state, " + 
			"    prop.country, " + 
			"    prop.zipCode, " + 
			"    prop.updatedBy, " + 
			"    prop.updatedOn, " + 
			"    prop.propertyCode, " +
			"    propertyType.typeId, " +
			"    propertyType.type, " +
			"    propertyType.description) " +
			" from " + 
			"    Property prop join PropertyType propertyType on prop.propertyType.typeId = propertyType.typeId " + 
			"    left join PropertyOccupancy occu on prop.propertyId = occu.propertyId " 
			+ " where " + 
			"    occu.id=NULL"
			)
	public List<PropertyDTO> findUnSoldProperties(Pageable pageable);
}

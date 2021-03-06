package com.youricsoft.houmain.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.youricsoft.houmain.model.Property;

public interface PropertyRepository extends CrudRepository<Property, Long> {
	
	Iterable<Property> findAll(Pageable pageable);
	
	List<Property> findAllByStatus(String status);
	
	@Query(value =  
			" select " +
			"	 prop,  " + 
			"    type,  " + 
			"    unit,  " + 
			"	 rate	" +
			//"    ,photos " + 
			" from Property prop join PropertyType type on   " + 
			" prop.propertyType.typeId=type.typeId   " + 
			" left join PropertyRate rate on prop.propertyId = rate.propertyId " +
			" left join PropertyOccupancy occu on prop.propertyId = occu.propertyId  " + 
			" left join PropertyUnit unit on prop.propertyId = unit.propertyId  " + 
			" left join PropertyPhotos photos on prop.propertyId = photos.propertyId and unit.propertyUnitId = photos.propertyUnitId  " + 
			" where " + 
			"    occu.id=NULL"
			)
	public List<Object[]> findUnSoldPropertieNames(Pageable pageable);
	
	@Query(value =  
			" select " +
			"	 prop,  " + 
			"    type,  " + 
			"    unit,  " + 
			"	 rate, " +
			"    photos " + 
			" from Property prop join PropertyType type on   " + 
			" prop.propertyType.typeId=type.typeId   " + 
			" left join PropertyRate rate on prop.propertyId = rate.propertyId " +
			" left join PropertyOccupancy occu on prop.propertyId = occu.propertyId  " + 
			" left join PropertyUnit unit on prop.propertyId = unit.propertyId  " + 
			" left join PropertyPhotos photos on prop.propertyId = photos.propertyId and unit.propertyUnitId = photos.propertyUnitId  " + 
			" where " + 
			"    occu.id=NULL"
			)
	public List<Object[]> findUnSoldPropertiesWithDetails(Pageable pageable);
	
	
	@Query(value=
			" SELECT prop, " +
			" type, " +
			" unit " +
			//" ,photos  " +
			" FROM " + 
			" Property prop inner join PropertyType type on prop.propertyType.typeId=type.typeId  " + 
			" left join PropertyUnit unit on prop.propertyId = unit.propertyId  " + 
			//" left join PropertyPhotos photos on prop.propertyId = photos.propertyId and unit.propertyUnitId = photos.propertyUnitId  " +  
			" left join PropertyOwnerMapping mapping on " + 
			" prop.propertyId = mapping.propertyId " + 
			" where mapping.mappingId=NULL " 
			)
	public List<Object[]> findUnMappedPropertieNames();
	
	@Query(value=
			" SELECT prop, " +
			" type, " +
			" unit, " +
			" photos  " +
			" FROM " + 
			" Property prop inner join PropertyType type on prop.propertyType.typeId=type.typeId  " + 
			" left join PropertyUnit unit on prop.propertyId = unit.propertyId  " + 
			" left join PropertyPhotos photos on prop.propertyId = photos.propertyId and unit.propertyUnitId = photos.propertyUnitId  " +  
			" left join PropertyOwnerMapping mapping on " + 
			" prop.propertyId = mapping.propertyId " + 
			" where mapping.mappingId=NULL " 
			)
	public List<Object[]> findUnMappedPropertiesWithDetails();
	
	@Query(value = "select prop " + 
			" from Property prop  " + 
			" left join PropertyUnit unit on prop.propertyId = unit.propertyId " + 
			" left join PropertyType type on type.typeId = unit.typeId " + 
			" left join PropertyPhotos photos on photos.propertyId = prop.propertyId and unit.propertyUnitId = photos.propertyUnitId " + 
			" left join PropertyOwnerMapping map on prop.propertyId = map.propertyId " + 
			" where map.ownerId =?1")
	public List<Property> findOwnerProperties(long ownerId);
	
}

package com.youricsoft.houmain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.youricsoft.houmain.dto.PropertyDTO;
import com.youricsoft.houmain.model.Property;

@Mapper
public interface PropertyMapper {

	PropertyMapper INSTANCE = Mappers.getMapper(PropertyMapper.class);
	
	PropertyDTO propertyToPropertyDTO(Property property);
	
	Property propertyDTOTOproperty(PropertyDTO propertydto);
	
}

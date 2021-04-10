package com.youricsoft.houmain.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import com.youricsoft.houmain.dto.PropertyDTO;
import com.youricsoft.houmain.model.Property;

@Mapper
public interface PropertyMapper {

	PropertyMapper INSTANCE = Mappers.getMapper(PropertyMapper.class);
	
	PropertyDTO propertyToPropertyDTO(Property property);
	
	List<PropertyDTO> propertyListToPropertyDTOList(List<Property> propertyList);
	
	@Mappings(
		@Mapping(target="propertyType.typeId", source="typeId")
	)
	Property propertyDTOTOproperty(PropertyDTO propertydto);
	
}

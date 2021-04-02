package com.youricsoft.houmain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import com.youricsoft.houmain.dto.OwnerDTO;
import com.youricsoft.houmain.model.Owner;

@Mapper(componentModel="spring")
public interface OwnerMapper {
	
	OwnerMapper INSTANCE = Mappers.getMapper(OwnerMapper.class);
    @Mappings({
    	@Mapping(target = "firstName", source = "firstName")
    })
	OwnerDTO ownerTOOwnerDTO(Owner owner);
    
    @Mappings({
    	@Mapping(target = "firstName", source = "firstName")
    })
	Owner ownerDTOTOOwner(OwnerDTO ownerDto);
    
}

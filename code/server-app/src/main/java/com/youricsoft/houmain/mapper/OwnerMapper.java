package com.youricsoft.houmain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import com.youricsoft.houmain.dto.OwnerDTO;
import com.youricsoft.houmain.dto.RegistrationDTO;
import com.youricsoft.houmain.model.Owner;
import com.youricsoft.houmain.model.User;


@Mapper(componentModel="spring")
public interface OwnerMapper {
	
	OwnerMapper INSTANCE = Mappers.getMapper(OwnerMapper.class);
    
	OwnerDTO ownerTOOwnerDTO(Owner owner);
    
    Owner ownerDTOTOOwner(OwnerDTO ownerDto);
    
    @Mappings({
    	@Mapping(target = "primaryEmail", source = "userName")
    })
    Owner registrationDTOtoOwner(RegistrationDTO registrationDTO);
    
    @Mappings({
    	@Mapping(target = "username", source = "primaryEmail")
    })
    User registrationDTOToUser(OwnerDTO ownerDTO);
}

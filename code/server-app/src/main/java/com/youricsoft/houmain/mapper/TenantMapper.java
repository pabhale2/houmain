package com.youricsoft.houmain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import com.youricsoft.houmain.dto.RegistrationDTO;
import com.youricsoft.houmain.model.Tenant;

@Mapper(componentModel="spring")
public interface TenantMapper {
	TenantMapper INSTANCE = Mappers.getMapper(TenantMapper.class);
	
    @Mappings({
    	@Mapping(target = "mobileNumber", source = "mobileNumber")
    })
	Tenant registrationDTOToTenant(RegistrationDTO registrationDTO);
}

package com.youricsoft.houmain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import com.youricsoft.houmain.dto.RegistrationDTO;
import com.youricsoft.houmain.dto.TenantDTO;
import com.youricsoft.houmain.model.Tenant;
import com.youricsoft.houmain.model.User;

@Mapper(componentModel="spring")
public interface TenantMapper {
	TenantMapper INSTANCE = Mappers.getMapper(TenantMapper.class);
	
    @Mappings({
    	@Mapping(target = "mobileNumber", source = "mobileNumber")
    })
	Tenant registrationDTOToTenant(RegistrationDTO registrationDTO);
    
    Tenant tenantDTOtoTenant(TenantDTO tenantDTO);
    
    @Mappings({
    	@Mapping(target = "username", source = "primaryEmail")
    })
    User tenantDTOToUser(TenantDTO tenantDTO);
    
    public default void merge(Tenant target, Tenant source) {
    	target.setAlternateEmailId(source.getAlternateEmailId()==null ? target.getAlternateEmailId() : source.getAlternateEmailId());
    	target.setMobileNumber(source.getMobileNumber() == null ? target.getMobileNumber() : source.getMobileNumber());
    	target.setRelationship(source.getRelationship() == null ? target.getRelationship() : source.getRelationship());
    	target.setTaxPayerId(source.getTaxPayerId() == null ? target.getTaxPayerId() : source.getTaxPayerId());
    	target.setTenantId(source.getTenantId() <=0 ? target.getTenantId() : source.getTenantId());
    	target.setUser(source.getUser() == null ? target.getUser() : source.getUser());
    }
}

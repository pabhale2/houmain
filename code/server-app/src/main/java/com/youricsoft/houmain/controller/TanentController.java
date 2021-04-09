package com.youricsoft.houmain.controller;

import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.youricsoft.houmain.bo.ServerResponse;
import com.youricsoft.houmain.dto.TenantDTO;
import com.youricsoft.houmain.mapper.TenantMapper;
import com.youricsoft.houmain.model.Tenant;
import com.youricsoft.houmain.model.TenantInterface;
import com.youricsoft.houmain.service.TenantService;

@RestController
@RequestMapping(value="/service/tenant")
public class TanentController {
	
	@Resource TenantService tenantService;
	
	@RequestMapping(value="/save", method=RequestMethod.POST)
	public ServerResponse<TenantInterface> saveTanent(@RequestBody TenantDTO tenantDTO){
		ServerResponse<TenantInterface> serverResponse = new ServerResponse<TenantInterface>();
		Optional<Tenant> existingTenant = tenantService.findById(tenantDTO.getTenantId());
		if(existingTenant.isPresent()) {
			Tenant tenant = TenantMapper.INSTANCE.tenantDTOtoTenant(tenantDTO);
			TenantMapper.INSTANCE.merge(existingTenant.get(), tenant);
			Tenant savedTenant = tenantService.save(existingTenant.get());
			serverResponse.setStatus(HttpStatus.OK);
			serverResponse.setResponseCode(HttpStatus.OK.value());
			serverResponse.setData(savedTenant);
		} else {
			Tenant savedTenant = tenantService.registerTenant(tenantDTO);
			serverResponse.setStatus(HttpStatus.OK);
			serverResponse.setResponseCode(HttpStatus.OK.value());
			serverResponse.setData(savedTenant);
		}
		return serverResponse;
	}
	
	
	
	@RequestMapping(value="/update", method=RequestMethod.PUT)
	public ServerResponse<List<String>> updateTanent(){
		ServerResponse<List<String>> serverResponse = new ServerResponse<>();
		return serverResponse;
	}
	
	@RequestMapping(value="/get", method=RequestMethod.GET)
	public ServerResponse<TenantInterface> getTenent(@RequestParam("tenantId") long tenantId){
		ServerResponse<TenantInterface> serverResponse = new ServerResponse<>();
		Optional<Tenant> tenant = tenantService.findById(tenantId);
		if(tenant.isPresent()) {
			serverResponse.setResponseCode(HttpStatus.OK.value());
			serverResponse.setStatus(HttpStatus.OK);
			serverResponse.setData(tenant.get());
		} else {
			serverResponse.setResponseCode(HttpStatus.NO_CONTENT.value());
			serverResponse.setStatus(HttpStatus.NO_CONTENT);
			serverResponse.setData(tenant.get());
		}
		return serverResponse;
	}
	

	@RequestMapping(value="/getByUserId", method=RequestMethod.GET)
	public ServerResponse<TenantInterface> getTenentByUserId(@RequestParam("userId") long userId){
		ServerResponse<TenantInterface> serverResponse = new ServerResponse<>();
		Optional<Tenant> tenant = tenantService.findByUserId(userId);
		if(tenant.isPresent()) {
			serverResponse.setResponseCode(HttpStatus.OK.value());
			serverResponse.setStatus(HttpStatus.OK);
			serverResponse.setData(tenant.get());
		} else {
			serverResponse.setResponseCode(HttpStatus.NO_CONTENT.value());
			serverResponse.setStatus(HttpStatus.NO_CONTENT);
			serverResponse.setData(tenant.get());
		}
		return serverResponse;
	}
	
	@RequestMapping(value="/getAll", method=RequestMethod.GET)
	public ServerResponse<List<Tenant>> getAllTenents(){
		ServerResponse<List<Tenant>> serverResponse = new ServerResponse<List<Tenant>>();
		List<Tenant> tenantList = tenantService.getAll();
		if(!tenantList.isEmpty()) {
			serverResponse.setResponseCode(HttpStatus.OK.value());
			serverResponse.setStatus(HttpStatus.OK);
			serverResponse.setData(tenantList);
		} else {
			serverResponse.setResponseCode(HttpStatus.NO_CONTENT.value());
			serverResponse.setStatus(HttpStatus.NO_CONTENT);
			serverResponse.setData(tenantList);
		}
		return serverResponse;
	}
}

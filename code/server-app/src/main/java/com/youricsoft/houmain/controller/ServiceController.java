package com.youricsoft.houmain.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.youricsoft.houmain.bo.ServerResponse;
import com.youricsoft.houmain.dto.PropertyServiceRequestDTO;
import com.youricsoft.houmain.enums.ServiceStatusEnum;
import com.youricsoft.houmain.model.PropertyServiceRequest;
import com.youricsoft.houmain.model.Services;
import com.youricsoft.houmain.service.MaintainanceServices;

@RestController
@RequestMapping(value="/service/")
public class ServiceController {
	
	@Resource MaintainanceServices maintainanceServices;
	
	@RequestMapping(value="/getByTypeId")
	public ServerResponse<List<Services>> serviceByType(@RequestParam("typeId") long typeId) {
		ServerResponse<List<Services>> response = new ServerResponse<List<Services>>();
		try {
			List<Services> services = maintainanceServices.findTypeId(typeId);
			if(services!=null && !services.isEmpty()) {
				response.setData(services);
				response.setResponseCode(HttpStatus.OK.value());
				response.setStatus(HttpStatus.OK);
			} else {
				response.setData(null);
				response.setResponseCode(HttpStatus.NO_CONTENT.value());
				response.setStatus(HttpStatus.NO_CONTENT);
			}
		} catch(RuntimeException exception) {
			response.setResponseCode(HttpStatus.BAD_REQUEST.value());
			response.setStatus(HttpStatus.BAD_REQUEST);
			response.setErrorMessage(exception.getMessage());
		}
		return response;
	}
	
	@RequestMapping(value="/createServiceRequest", method = RequestMethod.POST, consumes = "application/json")
	public ServerResponse<List<PropertyServiceRequest>> createServiceRequest(@RequestBody PropertyServiceRequestDTO propertyServiceRequestDTO) {
		ServerResponse<List<PropertyServiceRequest>> response = new ServerResponse<List<PropertyServiceRequest>>();
		List<PropertyServiceRequest> list = maintainanceServices.createPropertyServiceRequest(propertyServiceRequestDTO);
		if(list!=null && !list.isEmpty()) {
			response.setData(list);
			response.setStatus(HttpStatus.OK);
			response.setResponseCode(HttpStatus.OK.value());
		} else {
			response.setStatus(HttpStatus.NOT_MODIFIED);
			response.setResponseCode(HttpStatus.NOT_MODIFIED.value());
		}
		return response;
	}
	
	@RequestMapping(value="/serviceRequestByStatus", method = RequestMethod.GET)
	public ServerResponse<List<PropertyServiceRequest>> allNewServiceRequests(@RequestParam("status") ServiceStatusEnum serviceStatus) {
		ServerResponse<List<PropertyServiceRequest>> response = new ServerResponse<List<PropertyServiceRequest>>();
		List<PropertyServiceRequest> list = maintainanceServices.findALlServiceRequestByStatus(serviceStatus);
		if(list!=null && !list.isEmpty()) {
			response.setData(list);
			response.setStatus(HttpStatus.OK);
			response.setResponseCode(HttpStatus.OK.value());
		} else {
			response.setStatus(HttpStatus.NOT_MODIFIED);
			response.setResponseCode(HttpStatus.NOT_MODIFIED.value());
		}
		return response;
	}
	
	@RequestMapping(value="/propertyServiceRequests", method = RequestMethod.GET)
	public ServerResponse<List<PropertyServiceRequest>> propertyServiceRequests(@RequestParam("propertyId") long propertyId, @RequestParam("status") ServiceStatusEnum serviceStatusEnum) {
		ServerResponse<List<PropertyServiceRequest>> response = new ServerResponse<List<PropertyServiceRequest>>();
		List<PropertyServiceRequest> list = maintainanceServices.findAllServiceRequestByPropertyIdAndStatus(propertyId, serviceStatusEnum);
		if(list!=null && !list.isEmpty()) {
			response.setData(list);
			response.setStatus(HttpStatus.OK);
			response.setResponseCode(HttpStatus.OK.value());
		} else {
			response.setStatus(HttpStatus.NOT_MODIFIED);
			response.setResponseCode(HttpStatus.NOT_MODIFIED.value());
		}
		return response;
	}
}

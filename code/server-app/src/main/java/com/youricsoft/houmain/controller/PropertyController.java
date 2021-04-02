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
import com.youricsoft.houmain.dto.PropertyDTO;
import com.youricsoft.houmain.dto.PropertyInterface;
import com.youricsoft.houmain.mapper.PropertyMapper;
import com.youricsoft.houmain.model.Property;
import com.youricsoft.houmain.service.GenericService;

@RestController
@RequestMapping(value="/service/property")
public class PropertyController {
	
	@Resource
    private GenericService genericService;
		
	@RequestMapping(value="/save", method=RequestMethod.POST)
	public ServerResponse<PropertyInterface> saveProperty(@RequestBody PropertyDTO propertyDTO){
		ServerResponse<PropertyInterface> serverResponse = new ServerResponse<>();
		Property property = PropertyMapper.INSTANCE.propertyDTOTOproperty(propertyDTO);
		Property existingProperty = genericService.findbyIdProperty(property.getId());
		if ( existingProperty == null){
			genericService.saveProperty(property);
			serverResponse.setStatus(HttpStatus.OK);
			serverResponse.setResponseCode(HttpStatus.OK.value());
			serverResponse.setData(property);
		} else {
			serverResponse.setStatus(HttpStatus.CONFLICT);
			serverResponse.setResponseCode(HttpStatus.CONFLICT.value());
		}
		return serverResponse;
	}
	
	@RequestMapping(value="/update", method=RequestMethod.PUT)
	public ServerResponse<List<String>> updateProperty(){
		ServerResponse<List<String>> serverResponse = new ServerResponse<>();
		return serverResponse;
	}
	
	@RequestMapping(value="/get", method=RequestMethod.GET)
	public ServerResponse<Property> getProperty(@RequestParam("propertyId") long id){
		ServerResponse<Property> serverResponse = new ServerResponse<>();
		Property existingProperty = genericService.findbyIdProperty(id);
		if( existingProperty == null) {
			serverResponse.setStatus(HttpStatus.NOT_FOUND);
			serverResponse.setResponseCode(HttpStatus.NOT_FOUND.value());
		}else {
			serverResponse.setStatus(HttpStatus.OK);
			serverResponse.setResponseCode(HttpStatus.OK.value());
			serverResponse.setData(existingProperty);
		}
		return serverResponse;
	}
	
	@RequestMapping(value="/getAll", method=RequestMethod.GET)
	public ServerResponse<List<Property>> getProperties(){
		ServerResponse<List<Property>> serverResponse = new ServerResponse<>();
		List<Property> propertyList = genericService.findAllProperties();
		if(propertyList.isEmpty()) {
			serverResponse.setStatus(HttpStatus.NOT_FOUND);
			serverResponse.setResponseCode(HttpStatus.NOT_FOUND.value());
		} else {
		serverResponse.setStatus(HttpStatus.OK);
		serverResponse.setResponseCode(HttpStatus.OK.value());
		serverResponse.setData(propertyList);
		}
		return serverResponse;
	}
}

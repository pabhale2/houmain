package com.youricsoft.houmain.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.youricsoft.houmain.bo.ServerResponse;
import com.youricsoft.houmain.dto.PropertyDTO;
import com.youricsoft.houmain.enums.PropertyStatusEnum;
import com.youricsoft.houmain.mapper.PropertyMapper;
import com.youricsoft.houmain.model.Property;
import com.youricsoft.houmain.model.PropertyInterface;
import com.youricsoft.houmain.model.PropertyOwnerMapping;
import com.youricsoft.houmain.model.PropertyPhotos;
import com.youricsoft.houmain.model.User;
import com.youricsoft.houmain.service.GenericService;
import com.youricsoft.houmain.service.PropertyService;

@RestController
@RequestMapping(value="/service/property")
public class PropertyController {
	
	@Resource private GenericService genericService;
	@Resource private PropertyService propertyService;
		
	@RequestMapping(value="/save", method=RequestMethod.POST)
	public ServerResponse<PropertyInterface> saveProperty(@RequestBody PropertyDTO propertyDTO, Principal principal) {
		ServerResponse<PropertyInterface> serverResponse = new ServerResponse<>();
		Property property = PropertyMapper.INSTANCE.propertyDTOTOproperty(propertyDTO);
		Property existingProperty = propertyService.findById(property.getPropertyId());
		if ( existingProperty == null){
			property = propertyService.save(property);
			User user = genericService.findByUsername(principal.getName());
			propertyService.savePropertyOwnerMapping(property, user);
			serverResponse.setStatus(HttpStatus.OK);
			serverResponse.setResponseCode(HttpStatus.OK.value());
			serverResponse.setData(property);
		} else {
			serverResponse.setStatus(HttpStatus.CONFLICT);
			serverResponse.setResponseCode(HttpStatus.CONFLICT.value());
		}
		return serverResponse;
	}
	
	@RequestMapping(value="/get", method=RequestMethod.GET)
	public ServerResponse<Property> getProperty(@RequestParam("propertyId") long id){
		ServerResponse<Property> serverResponse = new ServerResponse<>();
		Property existingProperty = propertyService.findById(id);
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
	public ServerResponse<List<Property>> getProperties(@RequestParam(name = "startIndex", defaultValue = "0") int startIndex, @RequestParam(name="pageSize", defaultValue = "10") int pageSize){
		ServerResponse<List<Property>> serverResponse = new ServerResponse<>();
		List<Property> propertyList = propertyService.findAll(startIndex, pageSize);
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
	
	@RequestMapping(value="/uploadImage", method=RequestMethod.POST)
	public ServerResponse<PropertyPhotos> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("propertyId") long propertyId, @RequestParam("unitId") long unitId, @RequestParam("photoCategory") String photoCategory){
		ServerResponse<PropertyPhotos> serverResponse = new ServerResponse<PropertyPhotos>();
		try {
			PropertyPhotos propertyPhotos = propertyService.savePropertyPhotos(file, propertyId, unitId, photoCategory);
			serverResponse.setStatus(HttpStatus.OK);
			serverResponse.setResponseCode(HttpStatus.OK.value());
			serverResponse.setData(propertyPhotos);	
		}catch(IOException e) {
			serverResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
			serverResponse.setResponseCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		return serverResponse;
	}
	
	@RequestMapping(value="/uploadImages", method=RequestMethod.POST)
	public ServerResponse<List<PropertyPhotos>> uploadImages(@RequestParam("files") MultipartFile[] files, @RequestParam("propertyId") long propertyId, @RequestParam("unitId") long unitId, @RequestParam("photoCategory") String photoCategory){
		ServerResponse<List<PropertyPhotos>> serverResponse = new ServerResponse<List<PropertyPhotos>>();
		try {
			List<PropertyPhotos> list = propertyService.saveMultiplePropertyPhotos(files, propertyId, unitId, photoCategory);
			serverResponse.setStatus(HttpStatus.OK);
			serverResponse.setResponseCode(HttpStatus.OK.value());
			serverResponse.setData(list);	
		}catch(IOException e) {
			serverResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
			serverResponse.setResponseCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		return serverResponse;
	}
	
	@RequestMapping(value="/getUnsoldProperties", method=RequestMethod.GET)
	public ServerResponse<List<PropertyDTO>> getUnsoldProperties(@RequestParam(name = "startIndex", defaultValue = "0") int startIndex, @RequestParam(name="pageSize", defaultValue = "10") int pageSize, @RequestParam(name="details", defaultValue = "false") boolean detailsFlag) {
		ServerResponse<List<PropertyDTO>> serverResponse = new ServerResponse<List<PropertyDTO>>();
		List<PropertyDTO> propertiesList = propertyService.findUnSoldPropertes(startIndex, pageSize, detailsFlag);
		if(propertiesList!=null &&  !propertiesList.isEmpty()) {
			serverResponse.setResponseCode(HttpStatus.OK.value());
			serverResponse.setStatus(HttpStatus.OK);
			serverResponse.setData(propertiesList);
		} else {
			serverResponse.setResponseCode(HttpStatus.NO_CONTENT.value());
			serverResponse.setStatus(HttpStatus.NO_CONTENT);
			serverResponse.setData(propertiesList);
		}
		
		return serverResponse;
	}
	
	
	@RequestMapping(value="/inspectionProperties", method=RequestMethod.GET)
	public ServerResponse<List<Property>> inspectionProperties(@RequestParam(name = "startIndex", defaultValue = "0") int startIndex, @RequestParam(name="pageSize", defaultValue = "10") int pageSize, @RequestParam(name="details", defaultValue = "false") boolean detailsFlag) {
		ServerResponse<List<Property>> serverResponse = new ServerResponse<List<Property>>();
		List<Property> propertiesList = propertyService.findPropertiesForInspection(startIndex, pageSize, detailsFlag);
		if(propertiesList!=null &&  !propertiesList.isEmpty()) {
			serverResponse.setResponseCode(HttpStatus.OK.value());
			serverResponse.setStatus(HttpStatus.OK);
			serverResponse.setData(propertiesList);
		} else {
			serverResponse.setResponseCode(HttpStatus.NO_CONTENT.value());
			serverResponse.setStatus(HttpStatus.NO_CONTENT);
			serverResponse.setData(propertiesList);
		}
		
		return serverResponse;
	}
}

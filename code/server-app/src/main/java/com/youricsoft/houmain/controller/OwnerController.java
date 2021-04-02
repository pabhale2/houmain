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
import com.youricsoft.houmain.dto.OwnerDTO;
import com.youricsoft.houmain.dto.OwnerInterface;
import com.youricsoft.houmain.mapper.OwnerMapper;
import com.youricsoft.houmain.model.Owner;
import com.youricsoft.houmain.service.GenericService;


@RestController
@RequestMapping(value="/service/owner")
public class OwnerController {
	
	@Resource
    private GenericService genericService;
	
	@RequestMapping(value="/save", method=RequestMethod.POST)
	public ServerResponse<OwnerInterface> saveOwner(@RequestBody OwnerDTO ownerDTO){
		ServerResponse<OwnerInterface> response = new ServerResponse<>();
		Owner owner = OwnerMapper.INSTANCE.ownerDTOTOOwner(ownerDTO);
		Owner existingUser = genericService.findbyId(owner.getId());
		if (existingUser==null) {
			owner.setStatus(1);
			genericService.saveOwner(owner);
			response.setStatus(HttpStatus.OK);
			response.setResponseCode(HttpStatus.OK.value());
			response.setData(owner);
		} else {
			response.setStatus(HttpStatus.CONFLICT);
			response.setResponseCode(HttpStatus.CONFLICT.value());
		}
		return response;
    }
	
	@RequestMapping(value="/update", method=RequestMethod.PUT)
	public ServerResponse<List<String>> updateOwner(){
		ServerResponse<List<String>> serverResponse = new ServerResponse<>();
		return serverResponse;
	}
	
	@RequestMapping(value="/get", method=RequestMethod.GET, consumes="application/json")
	public ServerResponse<Owner> getOwner(@RequestParam("ownerId") long id){
		ServerResponse<Owner> response = new ServerResponse<Owner>();
		Owner existingOwner = genericService.findbyId(id);
		if(existingOwner==null) {
			response.setStatus(HttpStatus.NOT_FOUND);
			response.setResponseCode(HttpStatus.NOT_FOUND.value());
		}else {
			response.setStatus(HttpStatus.OK);
			response.setResponseCode(HttpStatus.OK.value());
			response.setData(existingOwner);
		}
		return response;
	}
	
	@RequestMapping(value="/getAll", method=RequestMethod.GET)
	public ServerResponse<List<Owner>> getAllOwners(){
		ServerResponse<List<Owner>> serverResponse = new ServerResponse<>();
		List<Owner> ownerList = genericService.findAllOwners();
		if(ownerList.isEmpty()) {
			serverResponse.setStatus(HttpStatus.NO_CONTENT);
			serverResponse.setResponseCode(HttpStatus.NO_CONTENT.value());
		}
		else {
			serverResponse.setStatus(HttpStatus.OK);
			serverResponse.setResponseCode(HttpStatus.OK.value());
			serverResponse.setData(ownerList);
		}
		return serverResponse;	
	}
	
	@RequestMapping(value="/get", method=RequestMethod.PUT, consumes="application/json")
	public ServerResponse<Owner> disableOwner(@RequestParam("OwnerId") long id){
		ServerResponse<Owner> response = new ServerResponse<Owner>();
		Owner existingOwner = genericService.findbyId(id);
		if(existingOwner==null) {
			response.setStatus(HttpStatus.NOT_FOUND);
			response.setResponseCode(HttpStatus.NOT_FOUND.value());
		}else {
			Owner updatedOwner = genericService.disableOwner(existingOwner);
			response.setStatus(HttpStatus.OK);
			response.setResponseCode(HttpStatus.OK.value());
			response.setData(updatedOwner);
		}
		return response;
	}
}

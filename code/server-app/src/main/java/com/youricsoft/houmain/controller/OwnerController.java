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
import com.youricsoft.houmain.dto.OwnerDTO;
import com.youricsoft.houmain.dto.OwnerInterface;
import com.youricsoft.houmain.mapper.OwnerMapper;
import com.youricsoft.houmain.model.Owner;
import com.youricsoft.houmain.model.User;
import com.youricsoft.houmain.service.GenericService;
import com.youricsoft.houmain.service.OwnerService;


@RestController
@RequestMapping(value="/service/owner")
public class OwnerController {
	
	@Resource private GenericService genericService;
	@Resource private OwnerService ownerService;
	
	@RequestMapping(value="/save", method=RequestMethod.POST)
	public ServerResponse<OwnerInterface> saveOwner(@RequestBody OwnerDTO ownerDTO){
		ServerResponse<OwnerInterface> response = new ServerResponse<>();
		Optional<Owner> existingUser = ownerService.findByPrimaryEmail(ownerDTO.getPrimaryEmail());
		if (existingUser.isPresent()) {
			populateExistingOwner(existingUser.get(), ownerDTO);
			ownerService.save(existingUser.get());
			response.setStatus(HttpStatus.OK);
			response.setResponseCode(HttpStatus.OK.value());
			response.setData(existingUser.get());
		} else {
			Owner savedOwner = ownerService.registerOwner(ownerDTO);
			if(savedOwner!=null && savedOwner.getId()>0) {
				response.setStatus(HttpStatus.OK);
				response.setResponseCode(HttpStatus.OK.value());
				response.setData(savedOwner);
			} else {
				response.setStatus(HttpStatus.NOT_MODIFIED);
				response.setResponseCode(HttpStatus.NOT_MODIFIED.value());
				response.setData(savedOwner);
			}
		} 
		return response;
    }
	
	private void populateExistingOwner(Owner owner, OwnerDTO ownerDTO) {
		owner.setCompanyName(ownerDTO.getCompanyName()==null ? owner.getCompanyName() : ownerDTO.getCompanyName());
		owner.setCity(ownerDTO.getCity()==null ? owner.getCity() : ownerDTO.getCity());
		owner.setCountry(ownerDTO.getCountry()==null ? owner.getCountry() : ownerDTO.getCountry());
		owner.setHomeNumber(ownerDTO.getHomeNumber()==null ? owner.getHomeNumber() : ownerDTO.getHomeNumber());
		owner.setMobileNumber(ownerDTO.getMobileNumber()==null ? owner.getMobileNumber() : ownerDTO.getMobileNumber());
		owner.setOfficeNumber(ownerDTO.getOfficeNumber()==null ? owner.getOfficeNumber() : ownerDTO.getOfficeNumber());
		owner.setState(ownerDTO.getState() ==null ? owner.getState() : ownerDTO.getState());
		owner.setStreetAddress(ownerDTO.getStreetAddress() ==null ? owner.getStreetAddress() : ownerDTO.getStreetAddress());
		owner.setTaxIdentityType(ownerDTO.getTaxIdentityType() ==null ? owner.getTaxIdentityType() : ownerDTO.getTaxIdentityType());
		owner.setTaxpayerId(ownerDTO.getTaxpayerId() ==null ? owner.getTaxpayerId() : ownerDTO.getTaxpayerId());
		owner.setZip(ownerDTO.getZip() == null ? owner.getZip() : ownerDTO.getZip());
		owner.setStatus(1);
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

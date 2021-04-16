package com.youricsoft.houmain.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.youricsoft.houmain.bo.ServerResponse;
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
}

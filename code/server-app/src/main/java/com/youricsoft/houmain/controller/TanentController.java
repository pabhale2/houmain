package com.youricsoft.houmain.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.youricsoft.houmain.bo.ServerResponse;

@RestController
@RequestMapping(value="/service/tanent")
public class TanentController {
	@RequestMapping(value="/save", method=RequestMethod.POST)
	public ServerResponse<List<String>> saveTanent(){
		ServerResponse<List<String>> serverResponse = new ServerResponse<>();
		return serverResponse;
	}
	
	@RequestMapping(value="/update", method=RequestMethod.PUT)
	public ServerResponse<List<String>> updateTanent(){
		ServerResponse<List<String>> serverResponse = new ServerResponse<>();
		return serverResponse;
	}
	
	@RequestMapping(value="/get", method=RequestMethod.GET)
	public ServerResponse<String> getTenent(){
		ServerResponse<String> serverResponse = new ServerResponse<>();
		return serverResponse;
	}
	
	@RequestMapping(value="/getAll", method=RequestMethod.GET)
	public ServerResponse<List<String>> getAllTenents(){
		ServerResponse<List<String>> serverResponse = new ServerResponse<>();
		return serverResponse;
	}
}

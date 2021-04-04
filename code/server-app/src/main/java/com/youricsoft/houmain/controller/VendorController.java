package com.youricsoft.houmain.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/vendor")
public class VendorController {
	
	@RequestMapping(value="/register")
	public void register() {
		
	}
}

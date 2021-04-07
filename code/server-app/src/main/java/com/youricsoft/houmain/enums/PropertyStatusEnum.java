package com.youricsoft.houmain.enums;

public enum PropertyStatusEnum {
	ACTIVE("ACTIVE"),
	INACTIVE("INACTIVE"),
	PENDING("PENDING"),
	UNDERCONSTRUCTION("UNDERCONSTRUCTION");
	
	private String value;
	
	public String getValue() {
		return value;
	}
	
	PropertyStatusEnum(String value) { 
		this.value = value;
	}
}

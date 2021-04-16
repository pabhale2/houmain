package com.youricsoft.houmain.enums;

public enum ServiceStatusEnum {
	CREATED("CREATED"),
	ASSIGNED("ASSIGNED"),
	INPROGRESS("INPROGRESS"),
	RESOLVED("RESOLVED"),
	HOLD("HOLD"),
	CLOSED("CLOSED"),
	PENDING("PENDING");
	
	private String value;
	
	public String getValue() {
		return this.value;
	}
	
	ServiceStatusEnum(String value) {
		this.value = value;
	}
}

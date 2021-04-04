package com.youricsoft.houmain.customenum;

public enum RegistrationEnum {
	OWNER("OWNER"),
	TENANT("TENANT");
	
	private String value;
	private long id;
	
	public long getId() {
		return value.equalsIgnoreCase("OWNER") ? 1 :
			value.equalsIgnoreCase("TENANT") ? 2 : 0;
	}
	public String getValue() {
		return value;
	}

	RegistrationEnum(String value) {
		this.value = value;
	}
}

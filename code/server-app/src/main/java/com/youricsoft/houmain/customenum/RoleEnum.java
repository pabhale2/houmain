package com.youricsoft.houmain.customenum;

import java.util.HashMap;
import java.util.Map;

public enum RoleEnum {
	ADMIN_USER("ADMIN_USER", 1),
	STANDARD_USER("STANDARD_USER", 2),
	INSPECTOR("INSPECTOR", 3),
	LOCAL_GUIDE("LOCAL_GUIDE", 4),
	VENDOR("VENDOR", 5),
	OWNER("OWNER", 6),
	TENANT("TENANT", 7);
	
	public static Map<String, Long> map = null;
	
	private String value;
	private long id;
	
	public long getId() {
		initMap();
		return map.get(value);
	}
	
	private void initMap() {
		if(map==null) {
			map = new HashMap<String, Long>();
			long i=1;
			for(RoleEnum s : values()){
				map.put(s.value, i++);
	        }
		}
	}
	public String getValue() {
		return value;
	}

	RoleEnum(String value, long id) {
		this.value = value;
	}
}

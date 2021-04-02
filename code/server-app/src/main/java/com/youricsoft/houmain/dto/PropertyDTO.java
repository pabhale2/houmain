package com.youricsoft.houmain.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class PropertyDTO implements PropertyInterface {
	
	private String propertyName;
	private String propertyDescription;
	private String address;
	private String city;
	private String state;
	private String country;
	private String zipCode;
	private String propertyType;
	private int unitcount;
	private int hallcount;
	private int bedcount;
	private int gallerycount;
	private int kitchencount;
	private int bathroomcount;
	private int toiletcount;
	private int entrygatenum;
	private String otherInfo;
	
}

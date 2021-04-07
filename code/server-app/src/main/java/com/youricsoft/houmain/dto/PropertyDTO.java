package com.youricsoft.houmain.dto;

import java.util.List;

import com.youricsoft.houmain.enums.PropertyStatusEnum;
import com.youricsoft.houmain.model.PropertyInterface;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class PropertyDTO implements PropertyInterface {
														
	private long propertyId;
	private String propertyName;
	private long typeId;
	private double lat;
	private double lng;
	private PropertyStatusEnum status;
	private String propertyDescription;
	private String address;
	private String city;
	private String state;
	private String country;
	private String zipCode;
	List<PropertyUnitDTO> propertyUnit;
	private boolean active;
	private String propertyCode;
	
	public void setPropertyCode(String propertyCode) {
		this.propertyCode = String.join("-", String.valueOf(this.typeId), this.city, this.state, this.country);
	}
		
}

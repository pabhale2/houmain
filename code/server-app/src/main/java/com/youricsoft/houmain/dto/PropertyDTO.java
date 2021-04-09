package com.youricsoft.houmain.dto;

import java.util.Date;
import java.util.List;

import com.youricsoft.houmain.enums.PropertyStatusEnum;
import com.youricsoft.houmain.model.PropertyInterface;
import com.youricsoft.houmain.model.PropertyType;

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
	private PropertyType propertyType;
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
	
	public PropertyDTO(long propertyId, String propertyName, double lat, double lng,
			String status, String propertyDescription, String address, String city, String state, String country,
			String zipCode, long updatedBy, Date updatedOn, String propertyCode, long typeId, String type, String description) {
		super();
		this.propertyId = propertyId;
		this.propertyName = propertyName;
		this.lat = lat;
		this.lng = lng;
		//this.status = status;
		this.propertyDescription = propertyDescription;
		this.address = address;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zipCode = zipCode;
		//this.updatedBy = updatedBy;
		//this.updatedOn = updatedOn;
		this.propertyCode = propertyCode;
		this.propertyUnit = propertyUnit;
		this.propertyType = new PropertyType();
		this.propertyType.setTypeId(typeId);
		this.propertyType.setType(type);
		this.propertyType.setDescription(description);
		
	}
	
	public PropertyDTO() {
		super();
	}
}

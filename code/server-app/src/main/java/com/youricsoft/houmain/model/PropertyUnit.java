package com.youricsoft.houmain.model;

import java.util.Date;
import java.util.List;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.youricsoft.houmain.enums.PropertyStatusEnum;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="property_unit")
public class PropertyUnit {
	
	@Column(name="property_unit_id")
	private long propertyUnitId;
	
	@Column(name="property_id")
	private long propertyId;
	
	@Column(name="type_id")
	private long typeId;
	
	
	private int unit;
	private String address;
	private int bed;
	private int gallary;
	private int bath;
	private float squareFeet;
	private float carpetArea;
	private boolean active;
	private User user;
	private Date updatedOn;
}

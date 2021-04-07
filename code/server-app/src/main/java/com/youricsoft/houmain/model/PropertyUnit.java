package com.youricsoft.houmain.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="property_unit")
public class PropertyUnit {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="property_unit_id")
	private long propertyUnitId;
	
	@Column(name="property_id")
	private long propertyId;
	
	@Column(name="type_id")
	private long typeId;
	
	@Column(name="unit")
	private int unit;
	
	@Column(name="address")
	private String address;
	
	@Column(name="bed")
	private int bed;

	@Column(name="gallary")
	private int gallary;
	
	@Column(name="bath")
	private int bath;
	
	@Column(name="squareFeet")
	private float squareFeet;
	
	@Column(name="carpet")
	private float carpetArea;
	
	@Column(name="active")
	private boolean active;
	
	@Column(name="updatedBy")
	private long updatedBy;
	
	@Column(name="updatedOn")
	private Date updatedOn;
}

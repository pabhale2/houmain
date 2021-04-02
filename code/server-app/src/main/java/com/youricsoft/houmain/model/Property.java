package com.youricsoft.houmain.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.youricsoft.houmain.dto.PropertyInterface;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="property")
public class Property implements PropertyInterface {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="id_property")
	private long id;
	
	@Column(name="property_name")
	private String propertyName;
	
	@Column(name="property_description")
	private String propertyDescription;
	
	@Column(name="address")
	private String address;
	
	@Column(name="city")
	private String city;
	
	@Column(name="state")
	private String state;
	
	@Column(name="country")
	private String country;
	
	@Column(name="zip_code")
	private String zipCode;
	
	@Column(name="property_type")
	private String propertyType;
	
	@Column(name="unitcount")
	private int unitcount;
	
	@Column(name="hallcount")
	private int hallcount;
	
	@Column(name="bedcount")
	private int bedcount;
	
	@Column(name="gallerycount")
	private int gallerycount;
	
	@Column(name="kitchencount")
	private int kitchencount;
	
	@Column(name="bathroomcount")
	private int bathroomcount;
	
	@Column(name="toiletcount")
	private int toiletcount;
	
	@Column(name="entrygatenum")
	private int entrygatenum;
	
	@Column(name="otherInfo")
	private String otherInfo;

}

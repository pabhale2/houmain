package com.youricsoft.houmain.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.youricsoft.houmain.enums.PropertyStatusEnum;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="property")
public class Property implements PropertyInterface {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="property_id")
	private long propertyId;
	
	@Column(name="property_name")
	private String propertyName;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name = "property_type_id" ,referencedColumnName = "type_id")
	PropertyType propertyType;
	
	@Column(name="lat")
	private double lat;
	
	@Column(name="lng")
	private double lng;
	
	@Column(name="status")
	private PropertyStatusEnum propertyStatusEnum;
	
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
	
	@OneToOne(cascade =CascadeType.ALL)
	@JoinColumn(name="updatedBy", referencedColumnName = "id")
	User user;
	
	/**
     * Roles are being eagerly loaded here because
     * they are a fairly small collection of items for this example.
     */
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
    	name = "propertyownermapping", 
    	joinColumns = @JoinColumn(name = "property_id", referencedColumnName = "property_id"),
        inverseJoinColumns = @JoinColumn(name = "owner_id", referencedColumnName = "id"))
    private List<PropertyUnit> propertyUnit;
}

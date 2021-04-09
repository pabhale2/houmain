package com.youricsoft.houmain.model;

import java.util.Date;
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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.youricsoft.houmain.enums.PropertyStatusEnum;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
	
	@OneToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name = "property_type_id" ,referencedColumnName = "type_id")
	PropertyType propertyType;
	
	@Column(name="lat")
	private double lat;
	
	@Column(name="lng")
	private double lng;
	
	@Column(name="status")
	private String status;
	
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
	
	@Column(name="updatedBy")
	private long updatedBy;
	
	@Column(name="updatedOn")
	private Date updatedOn;
	
	@Column(name="property_code")
	private String propertyCode;
	
//	@OneToOne(fetch = FetchType.EAGER)
//    @JoinTable(
//    	name = "propertyownermapping", 
//    	joinColumns = @JoinColumn(name = "propertyId", referencedColumnName = "property_id"),
//        inverseJoinColumns = @JoinColumn(name = "ownerId", referencedColumnName = "id"))
//    private PropertyOwnerMapping propertyOwnerMapping;
    
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name="property_id", referencedColumnName = "property_id")
    private List<PropertyUnit> propertyUnit;
    
}

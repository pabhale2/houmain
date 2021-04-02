package com.youricsoft.houmain.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.youricsoft.houmain.dto.OwnerInterface;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="app_owner")
public class Owner implements OwnerInterface {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="idapp_owner")
	private long id;
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	
	@Column(name="company_name")
	private String companyName;
	
	@Column(name="company")
	private Boolean company;
	
	@Column(name="primary_email")
	private String primaryEmail;
	
	@Column(name="alternate_email")
	private String alternameEmail;
	
	@Column(name="mobile_number")
	private String mobileNumber;
	
	@Column(name="home_number")
	private String homeNumber;
	
	@Column(name="office_number")
	private String officeNumber;
	
	@Column(name="number")
	private String number;
	
	@Column(name="dob")
	private Date dob;
	
	@Column(name="enddate")
	private Date endDate;
	
	@Column(name="street_address")
	private String streetAddress;
	
	@Column(name="city")
	private String city;
	
	@Column(name="state")
	private String state;
	
	@Column(name="zip")
	private String zip;
	
	@Column(name="country")
	private String country;
	
	@Column(name="comments")
	private String comments;
	
	@Column(name="taxpayer_id")
	private String taxpayerId;
	
	@Column(name="taxpayer_type")
	private String taxIdentityType;
	
	@Column(name="status")
	private int status;

}

package com.youricsoft.houmain.dto;

import java.util.Date;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class OwnerDTO implements OwnerInterface{
	private String firstName;
	private String lastName;
	private String companyName;
	private Boolean company;
	private String primaryEmail;
	private String alternameEmail;
	private String mobileNumber;
	private String homeNumber;
	private String officeNumber;
	private String number;
	private String streetAddress;
	private String city;
	private String state;
	private String zip;
	private String country;
	private String comments;
	private String taxpayerId;
	private String taxIdentityType;
	private int status;
	private Date dob;
	private Date startDate;
	private Date endDate;
}

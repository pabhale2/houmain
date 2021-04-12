package com.youricsoft.houmain.dto;

import java.util.Date;
import java.util.List;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class OwnerDTO implements OwnerInterface {
	private long id;
	private String firstName;
	private String lastName;
	private long userId;
	private String companyName;
	private String primaryEmail;
	private String password;
	private String alternameEmail;
	private String mobileNumber;
	private String homeNumber;
	private String officeNumber;
	private String streetAddress;
	private String city;
	private String state;
	private String zip;
	private String country;
	private String comments;
	private String taxpayerId;
	private String taxIdentityType;
	private int status;
	private List<PropertyDTO> properties;
}

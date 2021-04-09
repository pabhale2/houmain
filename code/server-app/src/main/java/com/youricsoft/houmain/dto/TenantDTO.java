package com.youricsoft.houmain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TenantDTO {
	private long tenantId;
	private String firstName;
	private String lastName;
	private String username;
	private long userId;
	private String taxPayerId;
	private String emergencyContact;
	private String relationship;
	private String alternateEmailId;
	private String mobileNumber;
	private String primaryEmail;
}

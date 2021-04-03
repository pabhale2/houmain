package com.youricsoft.houmain.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="tenant")
public class Tenant{
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="tenant_id")
	private int tenantId;
	
	@Column(name="user_id")
	private long userId;
	
	@Column(name="tax_payer_id")
	private String taxPayerId;
	
	@Column(name="emergency_contact")
	private String emergencyContact;
	
	@Column(name="relationship")
	private String relationship;
	
	@Column(name="email_id")
	private String emailId;
	
	@Column(name="mobile_number")
	private String mobileNumber;
}

package com.youricsoft.houmain.model;

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
@Table(name="tenant")
public class Tenant implements TenantInterface{
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="tenant_id")
	private long tenantId;
	
	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name="user_Id", referencedColumnName = "id")
	private User user;
	
	@Column(name="tax_payer_id")
	private String taxPayerId;
	
	@Column(name="emergency_contact")
	private String emergencyContact;
	
	@Column(name="relationship")
	private String relationship;
	
	@Column(name="email_id")
	private String alternateEmailId;
	
	@Column(name="mobile_number")
	private String mobileNumber;
}

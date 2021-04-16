package com.youricsoft.houmain.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
@Table(name="property_service_request")
public class PropertyServiceRequest {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name="property_id")
	private long propertyId;
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinColumn(name="service_id", referencedColumnName = "id")
	private Services service;
	
	@Column(name="vendor_id")
	private long vendorId;
	
	@Column(name="comment")
	private String comment;
	
	@Column(name="status")
	private String status;
	
}
	
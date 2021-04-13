package com.youricsoft.houmain.model;

import java.util.Date;

import javax.annotation.Generated;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="property_rate")
public class PropertyRate {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="id")
	private long id;
	
	@Column(name="property_id")
	private long propertyId;
	
	@Column(name="amount")
	private double rate;
	
	@Column(name="updatedBy")
	private long updatedBy;
	
	@Column(name="updatedOn")
	private Date updatedOn;
	
}

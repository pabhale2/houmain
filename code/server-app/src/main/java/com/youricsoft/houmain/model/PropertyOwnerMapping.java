package com.youricsoft.houmain.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="propertyownermapping")
public class PropertyOwnerMapping {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="mappingId")
	private long mappingId;
	
	@Column(name="ownerId")
	private long ownerId;
	
	@Column(name="propertyId")
	private long propertyId;
	
	@Column(name="registerDate")
	private Date registerDate;
	
	@Column(name="updatedBy")
	private long updatedBy;
	
	@Column(name="updatedOn")
	private Date updatedOn;
}

package com.youricsoft.houmain.model;

import java.sql.Blob;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="property_photos")
public class PropertyPhotos {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="property_photo_id")
	private long propertyPhotoId;
	
	@Column(name="property_id")
	private long propertyId;
	
	@Column(name="property_unit_id")
	private long propertyUnitId;
	
	@Lob
	@Column(name="photo")
	private byte[] photo;
	
	@Column(name="photo_type")
	private String photoType;
	
	@Column(name="photo_link")
	private String photoLink;
	
	@Column(name="photo_category")
	private String photoCategory;
	
	@Column(name="active")
	private boolean active;
	
	@Column(name="updatedBy")
	private long updatedBy;
	
	@Column(name="updatedOn")
	private Date updatedOn;
}
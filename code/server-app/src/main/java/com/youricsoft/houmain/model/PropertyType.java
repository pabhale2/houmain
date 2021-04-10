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
@Table(name="property_type")
public class PropertyType {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="type_id")
	private long typeId;
	
	@Column(name="type")
	private String type;
	
	@Column(name="description")
	private String description;

	public PropertyType(long typeId) {
		super();
		this.typeId = typeId;
	}

	public PropertyType() {
		super();
	}
	
	
	
}

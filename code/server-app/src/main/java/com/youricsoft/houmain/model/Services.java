package com.youricsoft.houmain.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="services")
public class Services {
	
 	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name="service")
	private String service;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="type_id", referencedColumnName = "type_id")
	private PropertyType propertyType;
	
	@Column(name="description")
	private String description;
	
}

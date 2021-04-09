package com.youricsoft.houmain.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyUnitDTO {
	private long unit;
	private long typdId;
	private long propertyId;
	private String address;
	private int bed;
	private int gallary;
	private int bath;
	private float squareFeet;
	private float carpetArea;
	private List<PropertyPhotosDTO> propertyPhotos;
}

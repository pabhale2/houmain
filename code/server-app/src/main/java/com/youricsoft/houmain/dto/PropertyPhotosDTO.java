package com.youricsoft.houmain.dto;

import java.io.File;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyPhotosDTO {
	private long propertyPhotosId;
	private long propertyId;
	private long unitId;
	private File file;
	private String photoType;
	private String photoCategory;
	private boolean active;
	private byte[] photo;
}

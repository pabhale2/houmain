package com.youricsoft.houmain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyServiceRequestDTO {
	private long id;
	private long propertyId;
	private long[] serviceId;
	private long vendorId;
	private String comment;
	private String status;
}

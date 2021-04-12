package com.youricsoft.houmain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyAssignmentStatusDTO {
	private long id;
	private long propertyId;
	private long userId;
	private String status;
	private String remark;
}

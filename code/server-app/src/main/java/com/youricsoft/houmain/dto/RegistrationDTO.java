package com.youricsoft.houmain.dto;

import com.youricsoft.houmain.customenum.RoleEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationDTO extends UserDTO {
	private String companyName;
	private String mobileNumber;
	private RoleEnum type;
}

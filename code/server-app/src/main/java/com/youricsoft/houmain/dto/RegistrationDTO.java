package com.youricsoft.houmain.dto;

import com.youricsoft.houmain.customenum.RegistrationEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationDTO extends UserDTO {
	private String companyName;
	private String mobileNumber;
	private RegistrationEnum type;
}

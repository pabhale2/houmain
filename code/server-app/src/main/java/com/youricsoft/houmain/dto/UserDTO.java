package com.youricsoft.houmain.dto;

import com.youricsoft.houmain.enums.RoleEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO implements UserInterface{
	private int userId;
	private String userName;
	private String password;
	private String firstName;
	private String lastName;
	private boolean userStatus;
	private RoleEnum roleName;
	
}

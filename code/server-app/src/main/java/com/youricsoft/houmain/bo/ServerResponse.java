package com.youricsoft.houmain.bo;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServerResponse<T> {
	private HttpStatus status;
	private int responseCode;
	private T data;
	private String errorMessage;
		
}

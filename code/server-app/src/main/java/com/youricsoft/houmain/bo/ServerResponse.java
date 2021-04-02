package com.youricsoft.houmain.bo;

import org.springframework.http.HttpStatus;

public class ServerResponse<T> {
	private HttpStatus status;
	private int responseCode;
	private T data;
	public HttpStatus getStatus() {
		return status;
	}
	public void setStatus(HttpStatus status) {
		this.status = status;
	}
	public int getResponseCode() {
		return responseCode;
	}
	public void setResponseCode(int responseCode) {
		this.responseCode = responseCode;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	
}

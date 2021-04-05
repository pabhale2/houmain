package com.youricsoft.houmain.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component("bCryptPasswordUtility")
public class BCryptPasswordUtility {
	private static BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	public static String encryptPassword(String password) {
		return encoder.encode(password);
	}
	public Boolean match(String encodedPassword, String newSource) {
		return encoder.matches(newSource, encodedPassword);
	}
	public static void main1(String[] args) {
		System.out.println(new BCryptPasswordEncoder().encode("admin12356"));
	}
}

package com.youricsoft.houmain.um.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.youricsoft.houmain.bo.Email;
import com.youricsoft.houmain.bo.GenericModel;
import com.youricsoft.houmain.bo.ServerResponse;
import com.youricsoft.houmain.dto.UserInterface;
import com.youricsoft.houmain.dto.UserDTO;
import com.youricsoft.houmain.model.ContactEntity;
import com.youricsoft.houmain.model.User;
import com.youricsoft.houmain.service.GenericService;
import com.youricsoft.houmain.util.BCryptPasswordUtility;
import com.youricsoft.houmain.util.EmailFactory;

@RestController
@RequestMapping("/userMgt")
public class NonSecureAPI {
	@Autowired
    private GenericService genericService;
	
	@Resource(name="bCryptPasswordUtility")
	private BCryptPasswordUtility passwordUtility;
	
	@Resource(name="emailFactory")
	private EmailFactory emailFactory;
	
	@Value("${admin.email}")		
	private String adminEmail;
	
	@RequestMapping(value ="/addUser", method=RequestMethod.POST)
    public ServerResponse<UserInterface> addUser(@RequestBody UserDTO user){
		ServerResponse<UserInterface> response = new ServerResponse<>();
		
		User existingUser = genericService.findByUsername(user.getUserName());
		if(existingUser!=null) {
			response.setStatus(HttpStatus.CONFLICT);
			response.setResponseCode(HttpStatus.CONFLICT.value());
		}else {
			User userEntry = new User();
			userEntry.setFirstName(user.getFirstName());
			userEntry.setLastName(user.getLastName());
			userEntry.setUsername(user.getUserName());
			userEntry.setPassword(passwordUtility.encryptPassword(user.getPassword()));
			userEntry.setUserStatus(user.isUserStatus());
			User savedUser = genericService.saveUser(userEntry);
			if(savedUser!=null) {
				Email email = new Email();
				String[] to = {savedUser.getUsername()};
				email.setTo(to);
				//email.setBody();
				email.setSubject("Devaten Performance Dashboard : Welcome");
				email.setFrom("devatenoffice@gmail.com");
				Map<String, Object> model = new HashMap<>();
				model.put("title", "Welcome to the Devaten Performance Dashboard");
				
				boolean emailStatus = false;
				try {
					model.put("userName", savedUser.getFirstName()+" "+savedUser.getLastName());
					emailStatus = emailFactory.sendMail(email, "/templates/welcome.vm", model);
				}catch(Exception e) {
					e.printStackTrace();
					response.setResponseCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
					response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
					//response.setData("Internal server Error");
					return response;
				}
				response.setStatus(HttpStatus.OK);
				response.setResponseCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
				savedUser.setPassword("");
				response.setData(savedUser);
			}else {
				response.setStatus(HttpStatus.BAD_REQUEST);
				response.setResponseCode(HttpStatus.BAD_REQUEST.value());
			}
		}
		return response;
    }
	
	@RequestMapping(value="/contact", method=RequestMethod.POST, consumes = {"application/json"})
	public ServerResponse<String> contact(@RequestBody GenericModel requestModel){
		ServerResponse<String> serverResponse = new ServerResponse<>();
		String name = requestModel.getMap().get("name").toString();
		String emailId = requestModel.getMap().get("emailId").toString();
		String message = requestModel.getMap().containsKey("message") ? (String)requestModel.getMap().get("message"):"" ;
		
		// TODO : remov hardcoding and make them in properties file
		Email email = new Email();
		String[] to = {adminEmail};
		
		email.setTo(to);
		email.setBody((String)requestModel.getMap().get("emailId"));
		email.setFrom("devatenoffice@gmail.com");
		email.setSubject("Devaten Performance Dashboard : Contact");
		
		Map<String, Object> model = new HashMap<>();
		model.put("title", "Message received from contact form");
		model.put("name", name);
		model.put("email", emailId);
		model.put("message", message);
		
		Email emailClient = new Email();
		String[] clientEmail = {emailId};
		
		emailClient.setTo(clientEmail);
		emailClient.setBody((String)requestModel.getMap().get("emailId"));
		emailClient.setFrom("devatenoffice@gmail.com");
		emailClient.setSubject("Devaten Performance Dashboard : Contact");
		
		Map<String, Object> modelClient = new HashMap<>();
		modelClient.put("title", "Our team will contact you soon.");
		
		
		boolean emailStatus = false;
		try {
			ContactEntity contact = new ContactEntity();
			contact.setName(name);
			contact.setEmailId(emailId);
			contact.setMessage(message);
			genericService.saveContact(contact);
			
			// TODO : send mail to client by saying thank you
			emailStatus = emailFactory.sendMail(emailClient, "templates/contactCustomer.vm", modelClient);
			// TODO : Send mail to admin with the given information
			emailStatus = emailFactory.sendMail(email, "templates/contactAdmin.vm", model);
		}catch(Exception e) {
			e.printStackTrace();
			serverResponse.setResponseCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
			serverResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
			serverResponse.setData("Internal server Error");
			return serverResponse;
		}
		serverResponse.setResponseCode(HttpStatus.OK.value());
		serverResponse.setStatus(HttpStatus.OK);
		// TODO : restructure the message
		serverResponse.setData("Thank you for contacting, will get back you soon");
		return serverResponse;
	}
	
	@RequestMapping(value="/resetPassword", method=RequestMethod.POST, consumes = {"application/json"})
	public ServerResponse<String> resetPassword(@RequestBody GenericModel requestModel){
		ServerResponse<String> serverResponse = new ServerResponse<>();
		
		String userName = (String)requestModel.getMap().get("userName");
		if(userName==null) {
			serverResponse.setResponseCode(HttpStatus.BAD_REQUEST.value());
			serverResponse.setStatus(HttpStatus.BAD_REQUEST);
		}else {
			User user = genericService.findByUsername(userName);
			if(user==null) {
				serverResponse.setResponseCode(HttpStatus.FORBIDDEN.value());
				serverResponse.setStatus(HttpStatus.FORBIDDEN);
			}else {
				Email email = new Email();
				String[] to = {user.getUsername()};
				email.setTo(to);
				//email.setBody();
				email.setSubject("Devaten Performance Dashboard : Password Reset");
				email.setFrom("devatenoffice@gmail.com");
				Map<String, Object> model = new HashMap<>();
				model.put("title", "Password reset");
				
				boolean emailStatus = false;
				try {
					int randomNumber = new Random().nextInt(10000);
					String passwordString = user.getFirstName()+randomNumber;
					user.setPassword(passwordUtility.encryptPassword(passwordString));
					genericService.saveUser(user);
					model.put("body", "your password reset successfully your password is "+passwordString);
					emailStatus = emailFactory.sendMail(email, "/templates/resetPassword.vm", model);
				}catch(Exception e) {
					e.printStackTrace();
					serverResponse.setResponseCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
					serverResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
					serverResponse.setData("Internal server Error");
					return serverResponse;
				}
				serverResponse.setResponseCode(emailStatus ? HttpStatus.OK.value() : HttpStatus.BAD_REQUEST.value());
				serverResponse.setStatus(emailStatus ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
				serverResponse.setData("Email sent successfully on "+user.getUsername()+"");
			}
		}
		return serverResponse;
	}
	
	@RequestMapping(value="/getProfilePic/{userName}", method=RequestMethod.GET)
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String userName) {
        // Load file from database'
		User user = genericService.findByUsername(userName);
		
        return ResponseEntity.ok()
                 .body(new ByteArrayResource(user.getUserProfile()));
    }
}

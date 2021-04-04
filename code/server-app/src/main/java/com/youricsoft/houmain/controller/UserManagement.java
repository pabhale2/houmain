package com.youricsoft.houmain.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.youricsoft.houmain.bo.Email;
import com.youricsoft.houmain.bo.GenericModel;
import com.youricsoft.houmain.bo.ServerResponse;
import com.youricsoft.houmain.dto.RegistrationDTO;
import com.youricsoft.houmain.dto.UserDTO;
import com.youricsoft.houmain.dto.UserInterface;
import com.youricsoft.houmain.model.User;
import com.youricsoft.houmain.service.GenericService;
import com.youricsoft.houmain.service.OwnerService;
import com.youricsoft.houmain.service.TenantService;
import com.youricsoft.houmain.util.BCryptPasswordUtility;
import com.youricsoft.houmain.util.EmailFactory;

@RestController
@RequestMapping(value="/service/user")
public class UserManagement {
	@Resource private GenericService userService;
	@Resource private TenantService tanentService;
	@Resource private OwnerService ownerService;
	@Resource(name="bCryptPasswordUtility")
	private BCryptPasswordUtility passwordUtility;
	
	@Resource(name="emailFactory")
	private EmailFactory emailFactory;
	
	//TODO : User role update pending
	@RequestMapping(value ="/save", method=RequestMethod.PUT, consumes = {"application/json"})
    public ServerResponse<UserInterface> updateUser(@RequestBody UserDTO user){
		ServerResponse<UserInterface> response = new ServerResponse<>();
		
		User existingUser = userService.findByUsername(user.getUserName());
		if(existingUser==null) {
			response.setStatus(HttpStatus.NOT_FOUND);
			response.setResponseCode(HttpStatus.NOT_FOUND.value());
		}else {
			existingUser.setFirstName(user.getFirstName());
			existingUser.setLastName(user.getLastName());
			existingUser.setUsername(existingUser.getUsername());
			existingUser.setPassword(existingUser.getPassword());
			existingUser.setUserStatus(user.isUserStatus());
			User savedUser = userService.saveUser(existingUser);
			if(savedUser!=null) {
				response.setStatus(HttpStatus.OK);
				response.setResponseCode(HttpStatus.OK.value());
				savedUser.setPassword("");
				response.setData(savedUser);
			}else {
				response.setStatus(HttpStatus.BAD_REQUEST);
				response.setResponseCode(HttpStatus.BAD_REQUEST.value());
			}
		}
		return response;
    }
	
	@RequestMapping(value="/disable", method=RequestMethod.PUT, consumes = {"application/json"})
	public ServerResponse<UserInterface> disableUser(@RequestBody UserDTO user){
		return updateUser(user);
	}
	
	@RequestMapping(value="/users", method=RequestMethod.GET)
	public ServerResponse<List<User>> getUsers(@RequestParam("activeUser") Boolean activeUser){
		ServerResponse<List<User>> serverResponse = new ServerResponse<>();
		serverResponse.setResponseCode(HttpStatus.OK.value());
		serverResponse.setStatus(HttpStatus.OK);
		List<User> userList = userService.findAllUsers();
		//TODO : remove above code 
				userList.forEach(user->{
					
						user.setUserProfile(null);
					
				});
		serverResponse.setData(userList.stream().filter(user->user.isUserStatus()==activeUser).collect(Collectors.toList()));
		return serverResponse;
	}
	
	@RequestMapping(value="/user", method=RequestMethod.GET, consumes = {"application/json"})
	public ServerResponse<UserInterface> getUserDeatils(@RequestBody String username){
		ServerResponse<UserInterface> response = new ServerResponse<>();
		
		User existingUser = userService.findByUsername(username);
		if(existingUser==null) {
			response.setStatus(HttpStatus.NOT_FOUND);
			response.setResponseCode(HttpStatus.NOT_FOUND.value());
		}else {
			response.setStatus(HttpStatus.OK);
			response.setResponseCode(HttpStatus.OK.value());
			response.setData(existingUser);
		}
		return response;
	}
	
	@RequestMapping(value ="/updateProfile", method=RequestMethod.PUT)
    public ServerResponse<UserInterface> updateProfile(@RequestParam("file") MultipartFile file,@RequestParam("fname") String fname, @RequestParam("lname") String lname, @RequestParam("username") String username, HttpServletRequest request) throws IOException {
		ServerResponse<UserInterface> response = new ServerResponse<>();
		
		User existingUser = userService.findByUsername(username);
		if(existingUser==null) {
			response.setStatus(HttpStatus.NOT_FOUND);
			response.setResponseCode(HttpStatus.NOT_FOUND.value());
		}else {
			existingUser.setFirstName(fname);
			existingUser.setLastName(lname);
			existingUser.setUsername(existingUser.getUsername());
			existingUser.setPassword(existingUser.getPassword());
			existingUser.setUserStatus(existingUser.isUserStatus());
			existingUser.setUserProfile(file.getBytes());
			//store profile image 
			
			String profilePicUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
	                .path("/userMgt/getProfilePic/")
	                .path(existingUser.getUsername())
	                .toUriString();
			
			existingUser.setUserProfilePath(profilePicUrl);
			
			User savedUser = userService.saveUser(existingUser);
			
			if(savedUser!=null) {
				response.setStatus(HttpStatus.OK);
				response.setResponseCode(HttpStatus.OK.value());
				savedUser.setPassword("");
				response.setData(savedUser);
			}else {
				response.setStatus(HttpStatus.BAD_REQUEST);
				response.setResponseCode(HttpStatus.BAD_REQUEST.value());
			}
		}
		return response;
    }
	
	@RequestMapping(value="/user", method=RequestMethod.GET)
	public ServerResponse<UserInterface> getUser(@RequestParam("username") String username){
		ServerResponse<UserInterface> response = new ServerResponse<>();
		response.setResponseCode(HttpStatus.OK.value());
		response.setStatus(HttpStatus.OK);
		User user = userService.findByUsername(username);			
		user.setUserProfile(null);
		response.setData(user);	
		return response;
	}
	
	@RequestMapping(value = "/resetPwd", method = RequestMethod.POST, consumes = {"application/json"})
	public ServerResponse<UserInterface> resetPwd(@RequestBody GenericModel genericModel){
		
		String username = genericModel.getMap().containsKey("username") ? (String)genericModel.getMap().get("username") : null;
		String newpassword = genericModel.getMap().containsKey("newpassword") ? (String)genericModel.getMap().get("newpassword") : null;
		String oldPassword = genericModel.getMap().containsKey("oldpassword") ? (String)genericModel.getMap().get("oldpassword") : null;
		
		ServerResponse<UserInterface> response = new ServerResponse<>();
			    User user = userService.findByUsername(username);

		if (genericModel.getMap().containsKey("username") && genericModel.getMap().containsKey("newpassword") && genericModel.getMap().containsKey("oldpassword")) {

			if (user != null) {
				if (passwordUtility.match(user.getPassword(), oldPassword)) {
					if (passwordUtility.match(user.getPassword(), newpassword)) {
						response.setResponseCode(HttpStatus.CONFLICT.value());
						response.setStatus(HttpStatus.CONFLICT);
					}else {
					user.setPassword(passwordUtility.encryptPassword(newpassword));
					User savedUser = userService.saveUser(user);
					savedUser.setPassword("");
					response.setResponseCode(HttpStatus.OK.value());
					response.setStatus(HttpStatus.OK);
					
					Email email = new Email();
					String[] to = {savedUser.getUsername()};
					email.setTo(to);
					//email.setBody();
					email.setSubject("Devaten Performance Dashboard : Change Password");
					email.setFrom("devatenoffice@gmail.com");
					Map<String, Object> model = new HashMap<>();
					model.put("title", "Change Password");
					
					boolean emailStatus = false;
					try {
						model.put("body", "your password has been successfully chnaged");
						emailStatus = emailFactory.sendMail(email, "/templates/changePassword.vm", model);
					}catch(Exception e) {
						e.printStackTrace();
						response.setResponseCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
						response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
						//response.setData("Internal server Error");
						return response;
					}
					
					
					response.setData(savedUser);
					}
				} else {
					response.setResponseCode(HttpStatus.NOT_ACCEPTABLE.value());
					response.setStatus(HttpStatus.NOT_ACCEPTABLE);
				}
			} else {
				response.setResponseCode(HttpStatus.NOT_FOUND.value());
				response.setStatus(HttpStatus.NOT_FOUND);
			}
		} else {
			response.setResponseCode(HttpStatus.BAD_REQUEST.value());
			response.setStatus(HttpStatus.BAD_REQUEST);
		}
		return response;
	    
	}
	
}

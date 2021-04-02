package com.youricsoft.houmain.util;

import java.util.Map;

import javax.mail.internet.MimeMessage;

import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.velocity.VelocityEngineUtils;

import com.youricsoft.houmain.bo.Email;

@Service(value="emailFactory")
public class EmailFactory {
	@Autowired
	private JavaMailSender javaMailSender;

	@Autowired
	private VelocityEngine velocityEngine;
	
	public boolean sendMail(Email email, String velocityTemplate, Map<String, Object> model) throws Exception {
		String text = VelocityEngineUtils.mergeTemplateIntoString(velocityEngine, velocityTemplate, "UTF-8", model);

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
		mimeMessageHelper.setFrom(email.getFrom());
		mimeMessageHelper.setTo(email.getTo());
		mimeMessageHelper.setSubject(email.getSubject());
		mimeMessageHelper.setText(text, true);

		javaMailSender.send(mimeMessage);
		
		email.setStatus(true);
		return email.isStatus();
	}
}

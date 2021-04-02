package com.youricsoft.houmain.config;

import java.io.IOException;
import java.util.Properties;

import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.VelocityException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.ui.velocity.VelocityEngineFactory;

@Configuration
public class EmailConfig {
	
	@Value("${smtp.host}")		
	private String smtpHost;
	
	@Value("${smtp.email}")		
	private String smtpEmail;
	
	@Value("${smtp.password}")		
	private String smtpPassword;
	
	@Value("${smtp.port}")		
	private Integer smtpPort;

	    @Bean
	    public JavaMailSender getMailSender() {
	        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
	        // Using gmail.
	        mailSender.setHost(smtpHost);
	        mailSender.setPort(smtpPort);
	        mailSender.setUsername(smtpEmail);
	        mailSender.setPassword(smtpPassword);
	 
	        Properties javaMailProperties = new Properties();
	        javaMailProperties.put("mail.smtp.starttls.enable", "true");
	        javaMailProperties.put("mail.smtp.auth", "true");
	        javaMailProperties.put("mail.transport.protocol", "smtp");
	        javaMailProperties.put("mail.debug", "true");
	 
	        mailSender.setJavaMailProperties(javaMailProperties);
	        return mailSender;
	    }
	 
	    /*
	     * FreeMarker configuration.
	     */
	    /*@Bean
	    public FreeMarkerConfigurationFactoryBean getFreeMarkerConfiguration() {
	        FreeMarkerConfigurationFactoryBean bean = new FreeMarkerConfigurationFactoryBean();
	        bean.setTemplateLoaderPath("/templates/");
	        return bean;
	    }*/
	 
	    /*
	     * Velocity configuration.
	     */
	    @Bean
	    public VelocityEngine getVelocityEngine() throws VelocityException, IOException {
	        VelocityEngineFactory factory = new VelocityEngineFactory();
	        Properties props = new Properties();
	        props.put("resource.loader", "class");
	        props.put("class.resource.loader.class", "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
	 
	        factory.setVelocityProperties(props);
	        return factory.createVelocityEngine();
	    }
}

package com.youricsoft.houmain.util;

import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

public class ThreadLocalSupporter {
	
	private static final ThreadLocal<NamedParameterJdbcTemplate> CONTEXT = new ThreadLocal<>();
	
	public static void setTenantId(String beanName, ApplicationContext applicationContext) {
		ConfigurableListableBeanFactory beanFactory = ((ConfigurableApplicationContext) applicationContext).getBeanFactory();
		CONTEXT.set((NamedParameterJdbcTemplate)beanFactory.getBean(beanName));
	}
	 
	public static NamedParameterJdbcTemplate getTenantId() {
		return CONTEXT.get();
	}
	 
	public static void clear() {
	    CONTEXT.remove();
	}
}

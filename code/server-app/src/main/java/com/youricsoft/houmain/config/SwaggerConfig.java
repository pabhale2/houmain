package com.youricsoft.houmain.config;

import static springfox.documentation.builders.PathSelectors.regex;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.google.common.base.Predicate;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
@Profile("production")
public class SwaggerConfig {

	@Bean
	public Docket postsApi() {
		return new Docket(DocumentationType.SWAGGER_2)
				.groupName("public-api")
				.apiInfo(apiInfo())
				.select()
				.paths(postPaths())
				.build();
	}

	private Predicate<String> postPaths() {
		return regex("/service/.*");
		//return or(regex("/service/.*"), regex("/userMgt"));
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("HouMain Services API")
				.description("HouMain Services Reference For Developers")
				.termsOfServiceUrl("http://houmainservices.com")
				.licenseUrl("houmainservices@gmail.com").version("1.0").build();
	}

}
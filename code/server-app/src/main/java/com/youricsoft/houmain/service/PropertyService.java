package com.youricsoft.houmain.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.youricsoft.houmain.model.Property;
import com.youricsoft.houmain.model.PropertyPhotos;

public interface PropertyService {
	public Property findById(long id);
	public List<Property> findAll();
	public Property save(Property property);
	public PropertyPhotos savePropertyPhotos(MultipartFile file, long propertyId, long unitId)  throws IOException;
}

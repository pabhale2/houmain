package com.youricsoft.houmain.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.youricsoft.houmain.dto.PropertyDTO;
import com.youricsoft.houmain.model.Property;
import com.youricsoft.houmain.model.PropertyPhotos;

public interface PropertyService {
	public Property findById(long id);
	public List<Property> findAll(int startIndex, int pageSize);
	public Property save(Property property);
	public PropertyPhotos savePropertyPhotos(MultipartFile file, long propertyId, long unitId, String photoCategory)  throws IOException;
	public List<PropertyPhotos> saveMultiplePropertyPhotos(MultipartFile[] files, long propertyId, long unitId, String photoCategory)  throws IOException;
	public List<PropertyDTO> findUnSoldPropertes(int startIndex, int pageSize);
}

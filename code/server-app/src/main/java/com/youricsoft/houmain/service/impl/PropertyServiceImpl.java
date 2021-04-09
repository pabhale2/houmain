package com.youricsoft.houmain.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.youricsoft.houmain.dto.PropertyDTO;
import com.youricsoft.houmain.model.Property;
import com.youricsoft.houmain.model.PropertyPhotos;
import com.youricsoft.houmain.model.PropertyUnit;
import com.youricsoft.houmain.repository.PropertyPhotosRepository;
import com.youricsoft.houmain.repository.PropertyRepository;
import com.youricsoft.houmain.service.PropertyService;

@Service
public class PropertyServiceImpl implements PropertyService{

	@Resource PropertyPhotosRepository propertyPhotosRepository;
	@Resource PropertyRepository propertyRepository;
	
	@Override
	public Property save(Property property) {
		// TODO Auto-generated method stub
		for(PropertyUnit unit : property.getPropertyUnit()) {
			unit.setTypeId(property.getPropertyType().getTypeId());
		}
		propertyRepository.save(property);
		return property;
	}

	@Override
	public Property findById(long id) {
		Optional<Property> returnedProperty = propertyRepository.findById(id);
		return returnedProperty.isPresent() ? returnedProperty.get() : null;
	}

	@Override
	public List<Property> findAll() {
		List<Property> properties = new ArrayList();
		propertyRepository.findAll()
		.forEach(properties::add);
		return properties;
	}
	
	@Override
	public PropertyPhotos savePropertyPhotos(MultipartFile file, long propertyId, long unitId, String photoCategory) throws IOException{
		Optional<Property> property = propertyRepository.findById(propertyId);
		if(property.isPresent()) {
			List<PropertyUnit> propertyUnit = property.get().getPropertyUnit().stream().filter(obj -> obj.getUnit()==unitId).collect(Collectors.toList());
			PropertyPhotos propertyPhotos = new PropertyPhotos();
			propertyPhotos.setPhoto(file.getBytes());
			propertyPhotos.setActive(true);
			propertyPhotos.setPropertyId(property.get().getPropertyId());
			propertyPhotos.setPropertyUnitId(propertyUnit.get(0).getUnit());
			propertyPhotos.setPhotoType(file.getContentType());
			propertyPhotos.setPhotoCategory(photoCategory);
			propertyPhotosRepository.save(propertyPhotos);
		
			return propertyPhotos;
		} else {
			return null;
		}
	}
	
	@Override
	@Transactional
	public List<PropertyPhotos> saveMultiplePropertyPhotos(MultipartFile[] files, long propertyId, long unitId, String photoCategory) throws IOException {
		List<PropertyPhotos> photoList = new ArrayList<PropertyPhotos>();
		for(MultipartFile file : files) {
			PropertyPhotos photos = savePropertyPhotos(file, propertyId, unitId, photoCategory);
			photoList.add(photos);
		}
		return photoList;
	}

	@Override
	public List<PropertyDTO> findUnSoldPropertes() {
		List<PropertyDTO> propertyList = propertyRepository.findUnSoldProperties();
		return propertyList;
	}
	
}

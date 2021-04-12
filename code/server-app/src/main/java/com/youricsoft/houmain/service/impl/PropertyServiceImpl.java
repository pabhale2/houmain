package com.youricsoft.houmain.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.youricsoft.houmain.dto.PropertyDTO;
import com.youricsoft.houmain.enums.PropertyStatusEnum;
import com.youricsoft.houmain.mapper.PropertyMapper;
import com.youricsoft.houmain.model.Property;
import com.youricsoft.houmain.model.PropertyOwnerMapping;
import com.youricsoft.houmain.model.PropertyPhotos;
import com.youricsoft.houmain.model.PropertyType;
import com.youricsoft.houmain.model.PropertyUnit;
import com.youricsoft.houmain.model.User;
import com.youricsoft.houmain.repository.PropertyOwnerMappingRepository;
import com.youricsoft.houmain.repository.PropertyPhotosRepository;
import com.youricsoft.houmain.repository.PropertyRepository;
import com.youricsoft.houmain.service.PropertyService;

@Service
public class PropertyServiceImpl implements PropertyService{

	@Resource PropertyPhotosRepository propertyPhotosRepository;
	@Resource PropertyRepository propertyRepository;
	@Resource PropertyOwnerMappingRepository propertyOwnerMappingRepository;
	
	@Override
	public Property save(Property property) {
		for(PropertyUnit unit : property.getPropertyUnit()) {
			unit.setTypeId(property.getPropertyType().getTypeId());
		}
		property = propertyRepository.save(property);
		return property;
	}

	@Override
	public Property findById(long id) {
		Optional<Property> returnedProperty = propertyRepository.findById(id);
		return returnedProperty.isPresent() ? returnedProperty.get() : null;
	}

	@Override
	public List<Property> findAll(int startIndex, int pageSize) {
		List<Property> properties = new ArrayList();
		Pageable page = PageRequest.of(startIndex, startIndex + pageSize);
		propertyRepository.findAll(page).forEach(properties::add);
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
	public List<PropertyDTO> findUnSoldPropertes(int startIndex, int pageSize, boolean detailsFlag) {
		Pageable page = PageRequest.of(startIndex, startIndex + pageSize);
		List<Object[]> propertyObjectList =null;
		if(detailsFlag) {
			propertyObjectList = propertyRepository.findUnSoldPropertiesWithDetails(page);
		} else {
			propertyObjectList = propertyRepository.findUnSoldPropertieNames(page);
		}
		List<Property> propertyList = preparePropertyObject(propertyObjectList);
		List<PropertyDTO> propertyDTOList = PropertyMapper.INSTANCE.propertyListToPropertyDTOList(propertyList);
		return propertyDTOList;
	}
	
	@Override
	public List<Property> findPropertiesForInspection(int startIndex, int pageSize, boolean detailsFlag) {
		Pageable page = PageRequest.of(startIndex, startIndex + pageSize);
		List<Property> propertyList = propertyRepository.findAllByStatus(PropertyStatusEnum.INSPECTION.getValue());
		return propertyList;
	}
	
	public List<Property> preparePropertyObject(List<Object[]> propertyList){
		Map<Long, Property> propertyMap = new HashMap<Long, Property>();
		for(Object[] obj : propertyList) {
			Property prop = (Property)obj[0];
			if(propertyMap.containsKey(prop.getPropertyId())) {
				prop = propertyMap.get(prop.getPropertyId());
				PropertyUnit unit = (PropertyUnit)obj[2];
				if(prop.getPropertyUnit().contains(unit.getPropertyUnitId())){
					if(propertyList.size()>3) {
						PropertyPhotos photos = (PropertyPhotos)obj[3];
						unit.getPropertyPhotos().add(photos);
					}
				} else {
					if(propertyList.size()>3) {
						PropertyPhotos photos = (PropertyPhotos)obj[3];
						unit.setPropertyPhotos(new ArrayList<PropertyPhotos>());
						unit.getPropertyPhotos().add(photos);
					}
				}
				prop.getPropertyUnit().add(unit);
				
			} else {
				PropertyType propertyType = (PropertyType) obj[1];
				prop.setPropertyType(propertyType);
				
				PropertyUnit unit = (PropertyUnit)obj[2];
				if(propertyList.size()>3) {
					PropertyPhotos photos = (PropertyPhotos)obj[3];
					unit.setPropertyPhotos(new ArrayList<PropertyPhotos>());
					unit.getPropertyPhotos().add(photos);
				}
				prop.setPropertyUnit(new ArrayList<PropertyUnit>());
				prop.getPropertyUnit().add(unit);
				
				propertyMap.put(prop.getPropertyId(), prop);
			}
		}
		
		return new ArrayList<Property>(propertyMap.values());
	}

	@Override
	public PropertyOwnerMapping savePropertyOwnerMapping(Property property, User user) {
		PropertyOwnerMapping propertyOwnerMapping = new PropertyOwnerMapping();
		propertyOwnerMapping.setPropertyId(property.getPropertyId());
		propertyOwnerMapping.setOwnerId(user.getId());
		propertyOwnerMapping.setRegisterDate(new Date());
		return propertyOwnerMappingRepository.save(propertyOwnerMapping);
	}

	@Override
	public List<PropertyDTO> findOwnerProperties(long ownerId) {
		List<Property> list = propertyRepository.findOwnerProperties(ownerId);
		return PropertyMapper.INSTANCE.propertyListToPropertyDTOList(list);
	}
	
}

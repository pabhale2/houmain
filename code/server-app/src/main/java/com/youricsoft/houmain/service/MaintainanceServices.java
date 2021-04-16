package com.youricsoft.houmain.service;

import java.util.List;

import com.youricsoft.houmain.model.Services;

public interface MaintainanceServices {
	public List<Services> findTypeId(long typeId);
}

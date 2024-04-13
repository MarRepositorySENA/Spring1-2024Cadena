package com.sena.servicesecurity.Service.Operational;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.servicesecurity.Entity.Operational.Category;
import com.sena.servicesecurity.IRepository.IBaseRepository;
import com.sena.servicesecurity.IRepository.Operational.ICategoryRepository;
import com.sena.servicesecurity.IService.IBaseService;
import com.sena.servicesecurity.IService.Operational.ICategoryService;
import com.sena.servicesecurity.Service.ABaseService;

@Service
public class CategoryService extends ABaseService<Category> implements ICategoryService {
@Autowired
public ICategoryRepository repository;
	
	
	@Override
	protected IBaseRepository<Category, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}

}

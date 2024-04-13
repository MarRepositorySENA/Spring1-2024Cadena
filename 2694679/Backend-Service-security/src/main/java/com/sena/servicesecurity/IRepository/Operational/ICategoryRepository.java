package com.sena.servicesecurity.IRepository.Operational;


import org.springframework.stereotype.Repository;

import com.sena.servicesecurity.Entity.Operational.Category;
import com.sena.servicesecurity.IRepository.IBaseRepository;

@Repository
public interface ICategoryRepository extends IBaseRepository<Category, Long> {

}

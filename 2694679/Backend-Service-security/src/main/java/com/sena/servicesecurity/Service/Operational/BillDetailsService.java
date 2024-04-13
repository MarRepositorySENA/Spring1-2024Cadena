package com.sena.servicesecurity.Service.Operational;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.stereotype.Service;

import com.sena.servicesecurity.Entity.Operational.BillDetails;
import com.sena.servicesecurity.IRepository.IBaseRepository;
import com.sena.servicesecurity.IRepository.Operational.IBillDetailsRepository;
import com.sena.servicesecurity.IService.Operational.IBillDetailsService;
import com.sena.servicesecurity.Service.ABaseService;

@Service
public class BillDetailsService extends ABaseService<BillDetails> implements IBillDetailsService{

	@Autowired
	public IBillDetailsRepository repository;
	@Override
	protected IBaseRepository<BillDetails, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}

}

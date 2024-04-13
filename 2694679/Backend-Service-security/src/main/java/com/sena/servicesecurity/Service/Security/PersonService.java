package com.sena.servicesecurity.Service.Security;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.sena.servicesecurity.DTO.IPersonDto;
import com.sena.servicesecurity.DTO.SecurityDto.IPerson2Dto;
import com.sena.servicesecurity.DTO.SecurityDto.IValidationDto;
import com.sena.servicesecurity.Entity.Security.Person;
import com.sena.servicesecurity.IRepository.IBaseRepository;
import com.sena.servicesecurity.IRepository.Security.IPersonRepository;
import com.sena.servicesecurity.IService.Operational.ICustomerService;
import com.sena.servicesecurity.IService.Security.IPersonService;
import com.sena.servicesecurity.Service.ABaseService;

@Service
public class PersonService extends ABaseService<Person> implements IPersonService {
    private final IPersonRepository repository; 
    @Lazy
    private final ICustomerService serviceCustomer;

    public PersonService(IPersonRepository repository, @Lazy ICustomerService serviceCustomer){
        this.repository = repository;
        this.serviceCustomer= serviceCustomer;
    }

    @Override
    public List<IPersonDto> getList() {
        return repository.getList();
    }

    @Override
    public List<IPerson2Dto> getDocumentByType(String TypeDocument) throws Exception {
        return repository.getDocumentByType(TypeDocument);
    }

    @Override
    public List<IValidationDto> getValidationE(String email) throws Exception {
        try {
            List<IValidationDto> validationListE= repository.getValidationE(email);
            return validationListE;
        } catch (Exception ex) {
            throw new Exception ("Error al obtener las validaciones desde la base de datos: "+ ex.getMessage());
        }
    }

    @Override
    public List<IValidationDto> getValidationD(String document) throws Exception {
       try {
        List<IValidationDto> validationListD = repository.getValidationD(document);
        return validationListD;
       } catch (Exception ex) {
        throw new Exception("Error al obtener las validaciones desde la base de datos: " + ex.getMessage());
       }
    }

    @Override
    protected IBaseRepository<Person, Long> getRepository() {
        return repository;
    }
}

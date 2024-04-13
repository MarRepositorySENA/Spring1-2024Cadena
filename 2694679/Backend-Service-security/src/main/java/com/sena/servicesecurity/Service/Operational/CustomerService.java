package com.sena.servicesecurity.Service.Operational;



import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.sena.servicesecurity.Entity.Operational.Customer;
import com.sena.servicesecurity.Entity.Security.Person;
import com.sena.servicesecurity.IRepository.IBaseRepository;
import com.sena.servicesecurity.IRepository.Operational.ICustomerRepository;
import com.sena.servicesecurity.IService.Operational.ICustomerService;
import com.sena.servicesecurity.IService.Security.IPersonService;
import com.sena.servicesecurity.Service.ABaseService;

@Service
public class CustomerService extends ABaseService<Customer> implements ICustomerService{

	private final ICustomerRepository repository;
	@Lazy
    private final IPersonService personService;

    public CustomerService(@Lazy IPersonService personService, ICustomerRepository repository) {
        this.repository = repository;
		this.personService = personService;
    }

	@Override
	public Customer savePersonCustomer(Person entity) throws Exception {
		Person person = personService.save(entity);
	    
	    entity.setCreatedAt(LocalDateTime.now());
        entity.setCreatedBy((long)1);
	    
        
        
	    Customer entityCustomer = new Customer();
	    
	    //LocalDateTime createdAt = person.getCreatedAt();
	   /* if (createdAt == null) {
	        throw new Exception("La fecha de creación es nula para la persona con ID: " + person.getId());
	    }*/
	    
	    String codeCustomer = GenerateCodeCustomer(person.getId(), person.getTypeDocument(), person.getDocument());
	  
	    entityCustomer.setCode(codeCustomer);
	    entityCustomer.setPerson(person);
	    entityCustomer.setState(true);
	    entityCustomer.setCreatedAt(LocalDateTime.now());
	    entityCustomer.setCreatedBy((long) 1);
	    
	    System.out.println(entityCustomer + "DATA AL lado del save");
	    
	    Customer customer = save(entityCustomer);
	    
	    return customer;
	}

	@Override
	public String GenerateCodeCustomer(long idPerson, String typeDocument, String document) throws Exception {
	
		Optional<Person> person =    personService.findById(idPerson);
		 
	    String documentDigits = document.substring(Math.max(0, document.length() - 4));
	    
	    LocalDateTime yerOnly = person.get().getCreatedAt();
	    int yer = yerOnly.getYear();
	    
	    
	
	    // Combinar los elementos para formar el código
	    String code = yer + "-" + typeDocument + "-" + documentDigits;

	    return code;
	}	
	

	@Override
	public void updateCusPerson(Long Idcustomer, Person entity) throws Exception {
		// Obtener el ID de la persona asociada al cliente
	    Optional<Customer> customerOpt = repository.findById(Idcustomer);
	    if (customerOpt.isEmpty()) {
	        throw new Exception("No se encontró el cliente con el ID: " + Idcustomer);
	    }

	    Long id_person = customerOpt.get().getPerson().getId();
	    String updatedType = customerOpt.get().getPerson().getTypeDocument();
	    String updatedDocument  = customerOpt.get().getPerson().getDocument();

	    Optional<Person> op = personService.findById(id_person);
	    
	    

	    if (op.isEmpty()) {
	        throw new Exception("Registro no encontrado");
	    } else if (op.get().getDeletedAt() != null) {
	        throw new Exception("Registro inhabilitado");
	    }

	    
	    
	    Person entityUpdate = op.get();
	    
	    // Guardar la fecha de creación antes de actualizar
	    LocalDateTime createdAt = entityUpdate.getCreatedAt();

	    String[] ignoreProperties = { "id", "createdAt", "deletedAt", "createdBy", "deletedBy" };
	    BeanUtils.copyProperties(entity, entityUpdate, ignoreProperties);
	    entityUpdate.setUpdatedAt(LocalDateTime.now());
	    entityUpdate.setUpdatedBy((long) 1); // Cuando esté el logging, se debe enviar el ID del usuario con Auth

	    personService.save(entityUpdate);
	    
	    String type = entityUpdate.getTypeDocument();
	    String documet = entityUpdate.getDocument();

	    // Verificar si el número de documento o el tipo de documento han cambiado
	    if (updatedType == type ||updatedDocument ==documet) {
	    	throw new Exception("No se a modificado los campos document y type");
	    }else {
	    	 Customer customer = customerOpt.get();
		        // Generar el nuevo código de cliente
		        String codeCustomer = GenerateCodeCustomer(entityUpdate.getId(), entityUpdate.getTypeDocument(), entityUpdate.getDocument());
		        // Actualizar el código de cliente
		        customer.setCode(codeCustomer);
		        // Guardar el cliente actualizado
		        repository.save(customer);
	    }
	}
	

	@Override
	public Customer findByPersonId(long person_id) throws Exception {
		return repository.findByPersonId(person_id);
	}

	@Override
	public void updatePerson(Long id_person, Person entity) throws Exception {
		
		Optional<Person> op = personService.findById(id_person);

	    
	    if (op.isEmpty()) {
            throw new Exception("Registro no encontrado");
        } else if (op.get().getDeletedAt() != null) {
            throw new Exception("Registro inhabilitado");
        }

        LocalDateTime createdAt = op.get().getCreatedAt();

	    Person entityUpdate = op.get();

        String[] ignoreProperties = { "id", "createdAt", "deletedAt", "createdBy", "deletedBy" };
        BeanUtils.copyProperties(entity, entityUpdate, ignoreProperties);
        entityUpdate.setUpdatedAt(LocalDateTime.now());
        entityUpdate.setUpdatedBy((long)1); //Cuanto esté el loggin, se debe enviar el ID del usuario con Auth
        personService.save(entityUpdate);

        
        List<Customer> data = all();
      

        
        Long idPerson = id_person;
        Long id_cliente = null;

        for (Customer customers : data) {
            if (customers.getPerson().getId().equals(idPerson)) {
                id_cliente = customers.getId();
                
                // Actualizar el código de cliente
                String codeCustomer = GenerateCodeCustomer(entityUpdate.getId(), entityUpdate.getTypeDocument(), entityUpdate.getDocument());
                
                // Obtener el cliente de la base de datos
                Optional<Customer> customerOpt = repository.findById(id_cliente);
                if (customerOpt.isPresent()) {
                    Customer customer = customerOpt.get();
                    customer.setCode(codeCustomer);
                    repository.save(customer);
                } else {
                    throw new Exception("No se encontró el cliente con el ID: " + id_cliente);
                }

                break; // Salir del bucle una vez que se haya encontrado el cliente
            }
        }
	    
	}

	@Override
	protected IBaseRepository<Customer, Long> getRepository() {
		return repository;
	}







}

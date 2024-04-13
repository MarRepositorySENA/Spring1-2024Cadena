package com.sena.servicesecurity.Entity.Operational;

import java.sql.Date;

import com.sena.servicesecurity.Entity.ABaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "bill")
public class Bill extends ABaseEntity{

	@Column(name = "code", nullable = false)
	String code;
	
	@Column(name = "date", nullable = false)
	Date date;
	
	@Column(name = "total_value", nullable = false)
	double totalValue;
	
	 
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
   	@JoinColumn(name = "customer_id", nullable = false)
       private Customer customer;


	public String getCode() {
		return code;
	}


	public void setCode(String code) {
		this.code = code;
	}


	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}


	


	public double getTotalValue() {
		return totalValue;
	}


	public void setTotalValue(double totalValue) {
		this.totalValue = totalValue;
	}


	public Customer getCustomer() {
		return customer;
	}


	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
    
	
		
    
	

}

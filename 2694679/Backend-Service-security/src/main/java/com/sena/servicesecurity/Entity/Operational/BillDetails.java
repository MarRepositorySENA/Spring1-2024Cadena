package com.sena.servicesecurity.Entity.Operational;

import com.sena.servicesecurity.Entity.ABaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "bill_details")
public class BillDetails extends ABaseEntity {

	 
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
   	@JoinColumn(name = "bill_id", nullable = false)
       private Bill bill;
    
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
   	@JoinColumn(name = "product_id", nullable = false)
       private Product product;
    
    @Column(name = "pay_value", nullable = false)
	double payValue;
	
	
    @Column(name = "amount", nullable = false)
	double amount;


	public Bill getBill() {
		return bill;
	}


	public void setBill(Bill bill) {
		this.bill = bill;
	}


	public Product getProduct() {
		return product;
	}


	public void setProduct(Product product) {
		this.product = product;
	}


	public double getPayValue() {
		return payValue;
	}


	public void setPayValue(double payValue) {
		this.payValue = payValue;
	}


	public double getAmount() {
		return amount;
	}


	public void setAmount(double amount) {
		this.amount = amount;
	}
    
    
    
}

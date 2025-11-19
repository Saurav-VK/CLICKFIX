package com.cts.clickfix.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Invoice {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "invoice_id_gen")
	@SequenceGenerator(name = "invoice_id_gen" , sequenceName = "invoice_id" , initialValue = 1000 , allocationSize = 10)
	private int invoiceId;
	private int bookingId;
	private int serviceTypeId;
	private int totalAmount;
	private String paymentStatus;
}

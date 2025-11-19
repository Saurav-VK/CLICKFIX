package com.cts.clickfix.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.clickfix.entity.Invoice;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice , Integer>{
 
	List<Invoice> findByPaymentStatus(String paymentStatus);
	List<Invoice> findByBookingId(int bookingId);
}

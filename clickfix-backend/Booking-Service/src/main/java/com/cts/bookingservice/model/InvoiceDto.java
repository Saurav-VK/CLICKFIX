package com.cts.bookingservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceDto {
	//no not null here as I am not populating invoice ID here since it has to be auto generated
	private Integer invoiceId;
	private int bookingId;
	private int serviceTypeId;
	@Positive
	private int totalAmount;
	private String paymentStatus;
}

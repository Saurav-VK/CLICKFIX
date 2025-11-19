package com.cts.clickfix.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class InvoiceReciptDto {
     String serviceName;
     int quantity;
     int amount;
     int tax;
     double total;
     String status;
}    


 
  
   

package com.cts.clickfix.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PayableDto {
   int bookingId;
   int processing;
   int pending;
   int completed;
}


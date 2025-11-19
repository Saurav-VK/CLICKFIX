package com.cts.Mechanic.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ApiException {
	private int code;
	private String message;
	private String path;
	private Date date;

}

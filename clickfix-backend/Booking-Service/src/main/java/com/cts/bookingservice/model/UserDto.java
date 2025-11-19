package com.cts.bookingservice.model;



import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
	@Positive(message = "Id cannot be negative")
	private Integer userId;
	@NotNull(message = "Name cannot be null")
	@Pattern(regexp = "^[A-Za-z ]{2,50}$",message = "Name must contain only letters and spaces (2–50 characters)")
	private String name;
	
	@Email(message = "email is not valid", regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
    @Column(unique = true, nullable = false)
	private String email;
	@Pattern(regexp = "^[6-9]\\d{9}$",message = "Phone number must be a valid 10-digit number")
	private String phone;
	@NotNull(message = "Address cannot be null")
	@Size(min = 5, max = 100, message = "Address must be between 5 and 100 characters")
	private String address;
	@Size(min = 8, message = "Password must be at least 8 characters long")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",message = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
	private String passwordHash;
	


	

}

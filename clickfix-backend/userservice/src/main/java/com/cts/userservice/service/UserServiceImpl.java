package com.cts.userservice.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



import com.cts.userservice.appconfig.BookingFeignClient1;
import com.cts.userservice.appconfig.JwtUtility;

import com.cts.userservice.entity.User;
import com.cts.userservice.exception.InvalidCredentialsException;
import com.cts.userservice.exception.ProfileUpdateException;
import com.cts.userservice.exception.UserAlreadyExistsException;
import com.cts.userservice.exception.UserNotFoundException;
import com.cts.userservice.model.BookingDto;
import com.cts.userservice.model.LoginResponseDto;
import com.cts.userservice.model.UserDto;
import com.cts.userservice.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	
	
	@Autowired
	private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;
    

    @Autowired
    private AuthenticationManager authenticationManager;

     @Autowired
     private JwtUtility jwtUtil;
     
     @Autowired
     private BookingFeignClient1 bookingFeign;

//     @Autowired
//     private CustomUserDetailsService userDetailsService; 

    
     @Override
     public UserDto registerUser(UserDto userDto) {
         Optional<User> existingUser = userRepository.findByEmail(userDto.getEmail());

         if (existingUser.isPresent()) {
             throw new UserAlreadyExistsException("User with email " + userDto.getEmail() + " already exists");
         }

         User user = modelMapper.map(userDto, User.class);
         String encodePass = passwordEncoder.encode(userDto.getPasswordHash());
         user.setPasswordHash(encodePass);

         User savedUser = userRepository.save(user);
         return modelMapper.map(savedUser, UserDto.class);
     }

    
    @Override
    public LoginResponseDto loginUser(UserDto userDto) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPasswordHash())
            );
        } catch (BadCredentialsException ex) {
            throw new InvalidCredentialsException("Incorrect password for email: " + userDto.getEmail());
        }

        User user = userRepository.findByEmail(userDto.getEmail())
            .orElseThrow(() -> new UserNotFoundException("User not found with email: " + userDto.getEmail()));

        String token = jwtUtil.generateToken(user.getEmail(), user.getUserId(),user.getPasswordHash());


        return new LoginResponseDto(token);
    }





    @Override
    public UserDto findProfileById(int userId) {
        return userRepository.findById(userId)
                .map(user -> modelMapper.map(user, UserDto.class))
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
    }
    @Override
    public UserDto updateUserProfile(int userId, UserDto userDto) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new UserNotFoundException("User not found with ID: " + userId);
        }

        try {
            User user = optionalUser.get();
            user.setName(userDto.getName());
            user.setEmail(userDto.getEmail());
            user.setPhone(userDto.getPhone());
            user.setAddress(userDto.getAddress());
            user.setPasswordHash(userDto.getPasswordHash());
            
            if(userDto.getPasswordHash()!= null && !userDto.getPasswordHash().isBlank()) {
            	String encodedPassword = passwordEncoder.encode(userDto.getPasswordHash());
            	user.setPasswordHash(encodedPassword);
            }

            userRepository.save(user);
            return modelMapper.map(user, UserDto.class);
        } catch (Exception e) {
            throw new ProfileUpdateException("Failed to update profile for user ID: " + userId);
        }
    }
    @Override
    public void deleteUserProfile(int userId) {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found with ID: " + userId);
        }
        userRepository.deleteById(userId);
    }
    
    public List<BookingDto> getBookingsByUserId(int userId) {
    	
    	List<BookingDto> result = bookingFeign.getBookingsByUserId(userId);
    	return result;
    	
    }
    
    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserDto.class))
                .collect(Collectors.toList());
    }
     
    public int getUserFromEmail(String email) {
    	int uid = 0;
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()) {
        	UserDto userModel = modelMapper.map(user, UserDto.class);
        	uid = userModel.getUserId();
        }
        else {
        	throw new UserNotFoundException("invalid email id");
        }
        return uid;
    }
    	
    }
    





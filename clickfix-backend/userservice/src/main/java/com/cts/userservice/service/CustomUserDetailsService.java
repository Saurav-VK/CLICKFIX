package com.cts.userservice.service;

import java.util.Collections;
import java.util.Optional;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cts.userservice.entity.User;
import com.cts.userservice.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("user email is"+username);
		
		Optional<User> optionaluser = userRepository.findByEmail(username);
		System.out.println("User details are: "+optionaluser.get());
		if(optionaluser.isEmpty()) {
			throw new UsernameNotFoundException ("Email is no there in the database");
		}
		
		User user = optionaluser.get();
		
		org.springframework.security.core.userdetails.User u = new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPasswordHash(), true, true, true, true, Collections.
				singletonList(new SimpleGrantedAuthority("ROLE_USER"))
				);

		return u;
	}

}

package com.cts.userservice.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cts.userservice.entity.User;
import com.cts.userservice.exception.*;
import com.cts.userservice.model.UserDto;
import com.cts.userservice.repository.UserRepository;
import com.cts.userservice.service.UserServiceImpl;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private UserServiceImpl userService;
    
    @Mock
    private PasswordEncoder passwordEncoder;


    private User user;
    private UserDto userDto;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        user = new User();
        user.setUserId(1);
        user.setName("John");
        user.setEmail("john@example.com");
        user.setPhone("1234567890");
        user.setPasswordHash("hashedPassword");

        userDto = new UserDto();
        userDto.setUserId(1);
        userDto.setName("John");
        userDto.setEmail("john@example.com");
        userDto.setPhone("1234567890");
        userDto.setPasswordHash("hashedPassword");
    }

    @Test
    public void testRegisterUser_Success() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());
        when(modelMapper.map(userDto, User.class)).thenReturn(user);
        when(passwordEncoder.encode(userDto.getPasswordHash())).thenReturn("encodedPassword");
        user.setPasswordHash("encodedPassword");
        when(userRepository.save(user)).thenReturn(user);
        when(modelMapper.map(user, UserDto.class)).thenReturn(userDto);

        UserDto result = userService.registerUser(userDto);
        assertEquals(userDto.getUserId(), result.getUserId());
    }


    @Test
    public void testRegisterUser_UserAlreadyExists() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        assertThrows(UserAlreadyExistsException.class, () -> userService.registerUser(userDto));
    }

    @Test
    public void testFindProfileById_Success() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(modelMapper.map(user, UserDto.class)).thenReturn(userDto);

        UserDto result = userService.findProfileById(1);
        assertEquals(userDto.getUserId(), result.getUserId());
    }

    @Test
    public void testFindProfileById_NotFound() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.findProfileById(1));
    }

    @Test
    public void testUpdateUserProfile_Success() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(modelMapper.map(user, UserDto.class)).thenReturn(userDto);

        UserDto result = userService.updateUserProfile(1, userDto);
        assertEquals(userDto.getName(), result.getName());
    }

    @Test
    public void testUpdateUserProfile_NotFound() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.updateUserProfile(1, userDto));
    }

    @Test
    public void testDeleteUserProfile_Success() {
        when(userRepository.existsById(1)).thenReturn(true);
        doNothing().when(userRepository).deleteById(1);
        assertDoesNotThrow(() -> userService.deleteUserProfile(1));
    }

    @Test
    public void testDeleteUserProfile_NotFound() {
        when(userRepository.existsById(1)).thenReturn(false);
        assertThrows(UserNotFoundException.class, () -> userService.deleteUserProfile(1));
    }
}

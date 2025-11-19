package com.cts.userservice.controller;

import com.cts.userservice.model.LoginResponseDto;
import com.cts.userservice.model.UserDto;
import com.cts.userservice.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;


@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private UserDto userDto;
    private LoginResponseDto loginResponseDto;

    @BeforeEach
    public void setUp() {
        userDto = new UserDto();
        userDto.setUserId(1);
        userDto.setName("John");
        userDto.setEmail("john@example.com");
        userDto.setPhone("9876543210");
        userDto.setAddress("123 Main Street, Chennai");
        userDto.setPasswordHash("Password@123");

        loginResponseDto = new LoginResponseDto();
        loginResponseDto.setToken("mocked-jwt-token");
    }
    
    

    @Test
    public void testRegisterUser() throws Exception {
        when(userService.registerUser(any(UserDto.class))).thenReturn(userDto);

        mockMvc.perform(post("/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(1));
    }

    @Test
    public void testLoginUser() throws Exception {
        when(userService.loginUser(any(UserDto.class))).thenReturn(loginResponseDto);

        mockMvc.perform(post("/users/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("mocked-jwt-token"));
    }

    @Test
    public void testFindProfileById() throws Exception {
        when(userService.findProfileById(1)).thenReturn(userDto);

        mockMvc.perform(get("/users/profile/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(1))
                .andExpect(jsonPath("$.name").value("John"));
    }

    @Test
    public void testUpdateUserProfile() throws Exception {
        when(userService.updateUserProfile(Mockito.eq(1), any(UserDto.class))).thenReturn(userDto);

        mockMvc.perform(put("/users/profile/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(1));
    }

    @Test
    public void testDeleteUserProfile() throws Exception {
        mockMvc.perform(delete("/users/profile/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("User profile deleted successfully."));
    }
}

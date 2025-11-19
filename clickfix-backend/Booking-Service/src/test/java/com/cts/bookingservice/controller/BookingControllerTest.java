package com.cts.bookingservice.controller;

import com.cts.bookingservice.model.BookingDto;
import com.cts.bookingservice.service.BookingServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BookingControllerTest {

    @Mock
    private BookingServiceImpl bookingService;

    @InjectMocks
    private BookingController bookingController;

    private BookingDto bookingDto;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        bookingDto = new BookingDto();
        bookingDto.setBookingId(1);
        bookingDto.setUserId(101);
        bookingDto.setDate(LocalDate.now());
        bookingDto.setTimeSlot(LocalTime.now());
        bookingDto.setStatus("Confirmed");
    }

    @Test
    public void testAddBooking() {
        when(bookingService.addBooking(any(BookingDto.class))).thenReturn(bookingDto);
        BookingDto result = bookingController.addBooking(new BookingDto());
        assertEquals(1, result.getBookingId());
        verify(bookingService).addBooking(any(BookingDto.class));
    }

    @Test
    public void testGetBookingById() {
        when(bookingService.getBookingById(1)).thenReturn(bookingDto);
        BookingDto result = bookingController.getBookingById(1);
        assertEquals(101, result.getUserId());
        verify(bookingService).getBookingById(1);
    }

    @Test
    public void testGetBookingsByUserId() {
        when(bookingService.getBookingsByUserId(101)).thenReturn(List.of(bookingDto));
        ResponseEntity<List<BookingDto>> response = bookingController.getBookingsByUserId(101);
        assertEquals(1, response.getBody().size());
        verify(bookingService).getBookingsByUserId(101);
    }

    @Test
    public void testDeleteBookingById() {
        when(bookingService.deleteBookingById(1)).thenReturn("Deleted");
        String result = bookingController.deleteBookingById(1);
        assertEquals("Deleted", result);
        verify(bookingService).deleteBookingById(1);
    }

    @Test
    public void testUpdateBooking() {
        when(bookingService.updateBooking(any(BookingDto.class))).thenReturn(bookingDto);
        ResponseEntity<BookingDto> response = bookingController.updateBooking(1, bookingDto);
        assertEquals(1, response.getBody().getBookingId());
        verify(bookingService).updateBooking(any(BookingDto.class));
    }

    @Test
    public void testGetBookingStatus() {
        when(bookingService.getBookingStatus(1)).thenReturn("Confirmed");
        String status = bookingController.getBookingStatus(1);
        assertEquals("Confirmed", status);
        verify(bookingService).getBookingStatus(1);
    }
    @Test
    public void testGetAllBookings() {
        when(bookingService.getAllBookings()).thenReturn(List.of(bookingDto));
        ResponseEntity<List<BookingDto>> response = bookingController.getAllBookings();
        
        assertNotNull(response);
        assertEquals(1, response.getBody().size());
        assertEquals(bookingDto.getBookingId(), response.getBody().get(0).getBookingId());
        verify(bookingService).getAllBookings();
    }
}

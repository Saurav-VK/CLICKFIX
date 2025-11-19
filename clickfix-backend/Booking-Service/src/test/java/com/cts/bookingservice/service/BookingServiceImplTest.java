package com.cts.bookingservice.service;

import com.cts.bookingservice.entity.Booking;
import com.cts.bookingservice.exception.BookingIdIsNotFoundException;
import com.cts.bookingservice.exception.BookingUpdateFailureException;
import com.cts.bookingservice.exception.UserIdIsNotFoundException;
import com.cts.bookingservice.model.BookingDto;
import com.cts.bookingservice.repository.BookingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BookingServiceImplTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private BookingServiceImpl bookingService;

    private Booking booking;
    private BookingDto bookingDto;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        booking = new Booking();
        booking.setBookingId(1);
        booking.setUserId(101);
        booking.setStatus("Confirmed");

        bookingDto = new BookingDto();
        bookingDto.setBookingId(1);
        bookingDto.setUserId(101);
        bookingDto.setStatus("Confirmed");
    }

    @Test
    public void testAddBooking() {
        when(modelMapper.map(any(BookingDto.class), eq(Booking.class))).thenReturn(booking);
        when(bookingRepository.save(any(Booking.class))).thenReturn(booking);
        when(modelMapper.map(any(Booking.class), eq(BookingDto.class))).thenReturn(bookingDto);

        BookingDto result = bookingService.addBooking(bookingDto);
        assertEquals(1, result.getBookingId());
    }

    @Test
    public void testGetBookingById_Found() {
        when(bookingRepository.findById(1)).thenReturn(Optional.of(booking));
        when(modelMapper.map(any(Booking.class), eq(BookingDto.class))).thenReturn(bookingDto);

        BookingDto result = bookingService.getBookingById(1);
        assertEquals(101, result.getUserId());
    }

    @Test
    public void testGetBookingById_NotFound() {
        when(bookingRepository.findById(2)).thenReturn(Optional.empty());
        assertThrows(BookingIdIsNotFoundException.class, () -> bookingService.getBookingById(2));
    }

    @Test
    public void testGetBookingsByUserId_Found() {
        when(bookingRepository.findAllByUserId(101)).thenReturn(List.of(booking));
        when(modelMapper.map(any(Booking.class), eq(BookingDto.class))).thenReturn(bookingDto);

        List<BookingDto> result = bookingService.getBookingsByUserId(101);
        assertEquals(1, result.size());
    }

    @Test
    public void testGetBookingsByUserId_NotFound() {
        when(bookingRepository.findAllByUserId(999)).thenReturn(Collections.emptyList());
        assertThrows(UserIdIsNotFoundException.class, () -> bookingService.getBookingsByUserId(999));
    }

    @Test
    public void testDeleteBookingById_Exists() {
        when(bookingRepository.existsById(1)).thenReturn(true);
        String result = bookingService.deleteBookingById(1);
        assertTrue(result.contains("deleted sucessfully"));
        verify(bookingRepository).deleteById(1);
    }

    @Test
    public void testDeleteBookingById_NotExists() {
        when(bookingRepository.existsById(2)).thenReturn(false);
        String result = bookingService.deleteBookingById(2);
        assertTrue(result.contains("delete is failed"));
    }

    @Test
    public void testUpdateBooking_Exists() {
        when(bookingRepository.existsById(1)).thenReturn(true);
        when(modelMapper.map(any(BookingDto.class), eq(Booking.class))).thenReturn(booking);
        when(bookingRepository.save(any(Booking.class))).thenReturn(booking);
        when(modelMapper.map(any(Booking.class), eq(BookingDto.class))).thenReturn(bookingDto);

        BookingDto result = bookingService.updateBooking(bookingDto);
        assertEquals(1, result.getBookingId());
    }

    @Test
    public void testUpdateBooking_NotExists() {
        when(bookingRepository.existsById(2)).thenReturn(false);
        bookingDto.setBookingId(2);
        assertThrows(BookingUpdateFailureException.class, () -> bookingService.updateBooking(bookingDto));
    }

    @Test
    public void testGetBookingStatus_Found() {
        when(bookingRepository.findById(1)).thenReturn(Optional.of(booking));
        String status = bookingService.getBookingStatus(1);
        assertEquals("Confirmed", status);
    }

    @Test
    public void testGetBookingStatus_NotFound() {
        when(bookingRepository.findById(2)).thenReturn(Optional.empty());
        assertThrows(BookingIdIsNotFoundException.class, () -> bookingService.getBookingStatus(2));
    }
    @Test
    public void testGetAllBookings() {
        List<Booking> bookingList = List.of(booking);

        when(bookingRepository.findAll()).thenReturn(bookingList);
        when(modelMapper.map(any(Booking.class), eq(BookingDto.class))).thenReturn(bookingDto);

        List<BookingDto> result = bookingService.getAllBookings();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(bookingDto.getBookingId(), result.get(0).getBookingId());
        verify(bookingRepository).findAll();
        verify(modelMapper, times(1)).map(any(Booking.class), eq(BookingDto.class));
    }
}

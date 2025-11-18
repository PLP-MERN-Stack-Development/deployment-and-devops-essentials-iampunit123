import { useQuery, useMutation, useQueryClient } from 'react-query';
import { bookingsAPI } from '../utils/api';
import toast from 'react-hot-toast';

export const useBookings = () => {
  return useQuery(
    'myBookings',
    bookingsAPI.getMyBookings,
    {
      staleTime: 2 * 60 * 1000,
    }
  );
};

export const useBooking = (id) => {
  return useQuery(
    ['booking', id],
    () => bookingsAPI.getById(id),
    {
      enabled: !!id,
      staleTime: 2 * 60 * 1000,
    }
  );
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (bookingData) => bookingsAPI.create(bookingData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('myBookings');
        toast.success('Booking created successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to create booking');
      },
    }
  );
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (bookingId) => bookingsAPI.cancel(bookingId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('myBookings');
        toast.success('Booking cancelled successfully');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to cancel booking');
      },
    }
  );
};

export const useBookingStats = () => {
  return useQuery(
    'bookingStats',
    bookingsAPI.getStats,
    {
      staleTime: 5 * 60 * 1000,
    }
  );
};
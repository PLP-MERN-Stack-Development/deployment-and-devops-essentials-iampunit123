import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toursAPI } from '../utils/api';
import toast from 'react-hot-toast';

export const useTours = (filters = {}) => {
  return useQuery(
    ['tours', filters],
    () => toursAPI.getAll(filters),
    {
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
    }
  );
};

export const useTour = (id) => {
  return useQuery(
    ['tour', id],
    () => toursAPI.getById(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useFeaturedTours = () => {
  return useQuery(
    'featuredTours',
    toursAPI.getFeatured,
    {
      staleTime: 10 * 60 * 1000,
    }
  );
};

export const useTourStats = () => {
  return useQuery(
    'tourStats',
    toursAPI.getStats,
    {
      staleTime: 15 * 60 * 1000,
    }
  );
};

export const useSearchTours = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (searchQuery) => toursAPI.search(searchQuery),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['tours', { search: data.search }], data);
      },
    }
  );
};
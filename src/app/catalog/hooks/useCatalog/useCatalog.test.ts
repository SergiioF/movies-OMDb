import { renderHook, act } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useCatalog } from './useCatalog';
const mockRouter = { replace: vi.fn(), push: vi.fn() };

vi.mock('../../services', () => ({
  getCatalog: vi.fn(),
  getDataById: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => '/current-path',
}));

vi.mock('./useGetCatalog', () => ({
  useGetCatalog: () => ({
    data: null,
    loading: false,
    error: null,
    searchCatalog: vi.fn(),
  }),
}));

vi.mock('@/app/utils/generateYears', () => ({
  generateYearOptions: (startYear: number, endYear: number) =>
    Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i),
}));

describe('useCatalog', () => {
  test('initializes with default filter values', () => {
    const { result } = renderHook(() => useCatalog());
    expect(result.current.filters).toEqual({ title: '', year: '', type: '' });
  });

  test('handles search correctly', async () => {
    const { result } = renderHook(() => useCatalog());
    await act(async() => {
     await result.current.handleSearch('Matrix');
    });
    expect(result.current.filters.title).toBe('Matrix');
  });

  test('handles filter change correctly', () => {
    const { result } = renderHook(() => useCatalog());
    act(() => {
      result.current.handleFilterChange('year', '1999');
    });
    expect(result.current.filters.year).toBe('1999');
  });

  test('handles item click correctly', async () => {
    const { result } = renderHook(() => useCatalog());

    await act(async () => {
      result.current.handleItemClick('tt1234567');
    });

    expect(mockRouter.push).toHaveBeenCalledWith('/catalog/tt1234567');
  });
});

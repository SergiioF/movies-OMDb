import { useState, useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { generateYearOptions } from '@/app/utils/generateYears';
import { useGetCatalog } from '..';

interface FilterState {
  title: string;
  year: string;
  type: string;
}

export const useCatalog = (defaultValue?: string) => {
  const { data, loading, error, searchCatalog } = useGetCatalog();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<FilterState>({
    title: '',
    year: '',
    type: '',
  });

  useEffect(() => {
    if (defaultValue) {
      searchCatalog({ ...filters, title: defaultValue });
    }
  }, []);

  const handleSearch = useCallback(
    (value: string) => {
      router.replace(pathname + `?search=${value}`, { scroll: false });
      setFilters((prev) => ({ ...prev, title: value }));
      searchCatalog({ ...filters, title: value });
    },
    [filters, searchCatalog],
  );

  const handleFilterChange = useCallback(
    (filterType: keyof FilterState, value: string) => {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
    },
    [],
  );

  const handleItemClick = useCallback(
    (id: string) => {
      router.push(`/catalog/${id}`);
    },
    [router],
  );

  const yearOptions = generateYearOptions(1990, new Date().getFullYear());

  return {
    filters,
    setFilters,
    handleSearch,
    handleFilterChange,
    handleItemClick,
    yearOptions,
    data,
    loading,
    error,
  };
};

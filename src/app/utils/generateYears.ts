export const generateYearOptions = (startYear: number, endYear:number) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ label: `${year}`, value: `${year}` });
    }
    return years;
  };
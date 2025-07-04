export type OptionSource = {
  value: string;
  label: string;
};

// valueKey, labelKey를 커스터마이징 할 수 있게 확장
export function makeSelectOptions<T>(
  apiData: T[] | undefined,
  valueKey: keyof T,
  labelKey: keyof T,
  allLabel?: string
) {
  const options = [
    ...(allLabel === "Y" ? [{ value: "", label: "::: ALL :::" }] : []),
    ...(apiData?.map(item => ({
      value: String(item[valueKey] ?? ""),
      label: item[valueKey] !== undefined && item[labelKey] !== undefined
        ? `${item[labelKey]}`
        : "",
    })) ?? [])
  ];
  return options;
}

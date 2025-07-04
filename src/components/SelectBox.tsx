import React from "react";
import Select, { type StylesConfig } from "react-select";

export type OptionType = { value: string; label: string };

interface SelectBoxProps {
  value: string | string[];
  onChange: (v: string | string[]) => void;
  options: OptionType[];
  isMulti?: boolean;
}

const customStyles: StylesConfig<OptionType, boolean> = {
  container: provided => ({
    ...provided,
    width: "100%",
  }),
  control: (provided, state) => ({
    ...provided,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: state.isFocused ? "#2563eb" : "#d1d5db",
    borderTopRightRadius: "0.25rem",
    borderBottomRightRadius: "0.25rem",
    minHeight: 32,
    height: 32,
    boxShadow: "none",
    fontSize: 12,
    padding: "0 0",
    backgroundColor: "white",
  }),
  valueContainer: provided => ({
    ...provided,
    height: 30,
    padding: "0 8px",
    display: "flex",
    alignItems: "center",
    marginLeft: "4px",
  }),
  input: provided => ({
    ...provided,
    margin: 0,
    padding: 0,
    height: 30,
    lineHeight: "28px",
  }),
  indicatorsContainer: provided => ({
    ...provided,
    height: 30,
  }),
  dropdownIndicator: provided => ({
    ...provided,
    padding: 4,
  }),
  clearIndicator: provided => ({
    ...provided,
    padding: 4,
  }),
  singleValue: provided => ({
    ...provided,
    fontSize: 12,
    margin: 0,
    padding: 0,
    lineHeight: "28px",
  }),
  option: provided => ({
    ...provided,
    fontSize: 12,
    padding: "2px 8px",
    minHeight: "28px",
    lineHeight: "28px",
  }),
  menu: provided => ({
    ...provided,
    zIndex: 10,
    marginTop: 0,
    padding: 0
  }),
};

export default function SelectBox({ value, onChange, options, isMulti = false }: SelectBoxProps) {
  // ::: ALL ::: 이 있으면 그대로, 없으면 첫 번째 option이 기본 선택되게 (싱글 전용)
  const hasAll = options[0]?.value === "";

  // value가 배열인지 체크(멀티 vs 싱글 분기)
  const multiMode = isMulti;
  
  // 멀티일 때: selectedOptions는 배열, 싱글일 때: selectedOption은 단일
  const selectedOption = multiMode
    ? options.filter(opt => Array.isArray(value) && value.includes(opt.value))
    : options.find(opt => opt.value === (hasAll ? value : (value || options[0]?.value || ""))) || null;

  // 싱글일 때만: value가 ""면 첫 번째 option 자동 선택
  React.useEffect(() => {
    if (!multiMode && !hasAll && !value && options.length > 0) {
      onChange(options[0].value);
    }
  }, [multiMode, hasAll, value, options, onChange]);

  return (
    <Select<OptionType, typeof isMulti>
      className="react-select-container"
      classNamePrefix="react-select"
      isSearchable={false}
      isMulti={multiMode}
      closeMenuOnSelect={!multiMode}
      options={options}
      value={selectedOption}
      onChange={option => {
        if (multiMode) {
          // 멀티: 배열로 반환
          onChange(Array.isArray(option) ? option.map(opt => opt.value) : []);
        } else {
          // 싱글: 단일 값
          onChange(option ? (option as OptionType).value : "");
        }
      }}
      placeholder="선택하세요"
      formatOptionLabel={(option, { context }) => {
        const isAll = option.value === "";
        if (context === "menu") {
          return isAll
            ? option.label
            : `(${option.value})${option.label}`;
        }
        return option.label;
      }}
      styles={customStyles}
      components={{
        IndicatorSeparator: () => null
      }}
      menuPlacement="auto"
    />
  );
}

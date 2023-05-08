"use client";

import IconType from "react-icons";
import Select from "react-select";
import useCountries from "../../hooks/useCountries";

export type CountrySelectInputValue = {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
};
interface ICountrySelectProps {
  value: CountrySelectInputValue;
  onChange: (value: CountrySelectInputValue) => void;
}

const CountrySelectInput: React.FC<ICountrySelectInputProps> = ({
  value,
  onChange,
}) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder="anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(options: any) => {
          return (
            <div className="flex flex-row items center gap-3">
              <div>{options.flag}</div>
              <div>
                {options.label},
                <span className="text-neutral-500 ml-1">{options.region}</span>
              </div>
            </div>
          );
        }}
        classNames={{
          control: (baseStyles) => "p-2 border-2",
          input: () => "text-lg",
          options: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelectInput;

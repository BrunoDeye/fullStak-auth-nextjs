import {
  Select,
  SelectSection,
  SelectItem,
  Selection,
  SelectedItems,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
export const CountrySelect = ({ value, onChange, labels, ...rest }: any) => {
  const values = getCountries()
    .filter((country) => country !== "SJ")
    .sort(
      (countryA, countryB) =>
        +getCountryCallingCode(countryA) - +getCountryCallingCode(countryB)
    )
    .map((country) => ({ value: country }));

  // const values = [{ value: 'BR' }]
  return (
    <Select
      {...rest}
      label="DDI"
      items={values}
      SelectedKeys={[value]}
      onChange={onChange}
      disallowEmptySelection
      classNames={{
        base: "max-w-xs",
        trigger: "!min-w-[120px] !max-w-[120px] ",
      }}
      size="lg"
      defaultSelectedKeys={["BR"]}
      renderValue={(items: SelectedItems<any>) => {
        return items.map((item) => (
          <div
            key={item.key}
            className="flex ml-1 !min-w-[60px] mr-1 items-center justify-between"
          >
            <Image
              height={20}
              width={30}
              alt={item.data.value}
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item.data.value}.svg`}
            />{" "}
            <span className="leading-none">+{getCountryCallingCode(item.data.value)}</span>
          </div>
        ));
      }}
    >
      {(country: any) => {
        return (
          <SelectItem key={country.value} textValue={country.value}>
            <div className="flex min-w-[60px] !max-w-[60px] my-1 items-center justify-between">
              <Image
                height={20}
                width={30}
                alt={country.value}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.value}.svg`}
              />{" "}
              <span className="leading-none">+{getCountryCallingCode(country.value)}</span>
            </div>
          </SelectItem>
        );
      }}
    </Select>
  );
};

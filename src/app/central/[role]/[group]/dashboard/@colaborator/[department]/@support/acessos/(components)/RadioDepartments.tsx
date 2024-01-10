import React from "react";
import {RadioGroup, Radio} from "@nextui-org/react";

export type Departments = "support" |
"logistics" |
"dispatch" |
"maintenance" |
"marketing"

type DepartmentsState = [
  Departments,
  React.Dispatch<React.SetStateAction<Departments>>
]

type Props = {
  useDeparmentsState: DepartmentsState
}


export default function RadioDepartments({ useDeparmentsState }: Props) {
  const [selected, setSelected] = useDeparmentsState;

  return (
    <div className="flex flex-col gap-3">
      <RadioGroup
        orientation="horizontal"
        label="Selecione o departamento"
        value={selected}
        onValueChange={setSelected as (value: string) => void}
      >
        <Radio value="support">Suporte</Radio>
        <Radio value="logistics">Logística</Radio>
        <Radio value="dispatch">Expedição</Radio>
        <Radio value="maintenance">Manutenção</Radio>
        <Radio value="marketing">Marketing</Radio>
      </RadioGroup>
    </div>
  );
}

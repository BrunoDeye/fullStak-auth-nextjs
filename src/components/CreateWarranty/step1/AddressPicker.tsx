import React from "react";
import { RadioGroup, Radio, Button } from "@nextui-org/react";

type Props = {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
  onOpen: () => void;
  onListOpen: () => void;
};
function AddressPicker({ setSelected, selected, onOpen, onListOpen }: Props) {
  return (
    <div className="flex max-sm:flex-col items-center justify-center gap-1 w-full">
      <h6 className="text-slate-600/50 text-md">
        Selecionar endereço cadastrado ou preencher manualmente?
      </h6>
      <div className="flex sm:ml-10 max-sm:justify-around gap-5 w-full">
        <Button size="md" variant="shadow" onClick={onListOpen} value="list">
          Lista de endereços
        </Button>
        <Button size="md" variant="shadow" onClick={onOpen} value="manual">
          Manualmente
        </Button>
      </div>
    </div>
  );
}

export default AddressPicker;

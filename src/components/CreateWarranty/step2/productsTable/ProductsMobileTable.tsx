import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { Product, typeColorMap } from "./ProductsTable";
import { EditIcon } from "lucide-react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { mapTypes } from "../SelectType";

type Props = {
  products: Product[];
  onOpen: () => void;
  isEditId: number;
  setIsEditId: React.Dispatch<React.SetStateAction<number>>;
  handleDelete: React.Dispatch<React.SetStateAction<number>>;
};

function ProductsMobileTable({
  products,
  isEditId,
  onOpen,
  setIsEditId,
  handleDelete,
}: Props) {
  const formattedProducts = useMemo(
    () =>
      products.map((product, index) => [
        {
          key: "ID",
          value: product.id,
        },
        {
          key: "Nº",
          value: (index: number) => index + 1,
        },
        {
          key: "TIPO",
          value: product.type,
        },
        {
          key: "MODELO",
          value: product.model,
        },
        {
          key: "Nº DE SÉRIE",
          value: product.serialNumber,
        },
        {
          key: "ALERTA",
          value: product.alert,
        },
        {
          key: "DESCRIÇÃO",
          value: product.description,
        },
      ]),
    [products]
  );

  const handleEdit = (id: number) => {
    setIsEditId(id);
    onOpen();
  };

  return formattedProducts.map((product, productIndex) => (
    <Table
      key={productIndex}
      className="lg:hidden w-full"
      hideHeader
      isStriped
      aria-label="Example static collection table"
      classNames={{
        tbody: `${
          products[0].model === "" ? "[&_td]:[&_*]:!h-12" : "w-full !mx-auto"
        }`,
        base: "mx-auto w-full",
        td: "max-[330px]:!max-w-[32vw]",
        tr: "mx-auto w-full",
        table: "!mx-auto w-full",
        wrapper: "!mx-auto w-full",
      }}
    >
      <TableHeader>
        <TableColumn>KEY</TableColumn>
        <TableColumn>VALUE</TableColumn>
      </TableHeader>
      {products[0].model === "" ? (
        <TableBody emptyContent={"Nenhum produto adicionado."}>{[]}</TableBody>
      ) : (
        <TableBody>
          {product.map(({ key, value }, index) => {
            switch (key) {
              case "ID":
                return (
                  <TableRow key={index}>
                    <TableCell>Produto</TableCell>
                    <TableCell
                      align="right"
                      className=" !min-h-[65px] relative flex items-center justify-end gap-5"
                    >
                      <Tooltip content="Editar">
                        <span
                          onClick={() => handleEdit(value as number)}
                          className="text-lg  text-default-400 cursor-pointer active:opacity-50"
                        >
                          <EditIcon className="max-h-[40px] min-w-[24px]" />
                        </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Excluir">
                        <span
                          onClick={() => handleDelete(value as number)}
                          className="text-lg text-danger cursor-pointer active:opacity-50"
                        >
                          <RiDeleteBin2Line
                            height={40}
                            width={40}
                            className="min-h-[40px] min-w-[24px] max-h-[40px]"
                          />
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              case "Nº":
                return (
                  <TableRow key={index}>
                    <TableCell>{key}</TableCell>
                    <TableCell className="flex justify-end">
                      {(value as (index: number) => number)(productIndex)}
                    </TableCell>
                  </TableRow>
                );
              case "Nº DE SÉRIE":
                return (
                  <TableRow key={index}>
                    <TableCell className="whitespace-nowrap">{key}</TableCell>
                    <TableCell className="flex justify-end [&_span]:!whitespace-pre-wrap [&_span]:max-w-[60px] [&_span]:ml-auto">
                      {value as string}
                    </TableCell>
                  </TableRow>
                );
              case "TIPO":
                return (
                  <TableRow key={index}>
                    <TableCell className="whitespace-nowrap">{key}</TableCell>
                    <TableCell className="flex justify-end">
                      <Chip
                        className="capitalize -ml-1"
                        color={typeColorMap[value as any]}
                        size="sm"
                        variant="flat"
                      >
                        {mapTypes[value as never]}
                      </Chip>
                    </TableCell>
                  </TableRow>
                );
              case "ALERTA":
                return (
                  <TableRow key={index}>
                    <TableCell>{key}</TableCell>
                    <TableCell className="flex justify-end">
                      {
                        <div className="relative flex flex-wrap justify-end -mr-1 gap-2">
                          {(value as string[]).map((item, index) => (
                            <Chip
                              key={`${item}-${index}`}
                              className="capitalize max-[330px]:whitespace-pre-line max-[330px]:h-auto max-[330px]:p-1"
                              size="sm"
                              variant="flat"
                            >
                              {(Array.from(value as never) as never)[index]}
                            </Chip>
                          ))}
                        </div>
                      }
                    </TableCell>
                  </TableRow>
                );
              default:
                return (
                  <TableRow key={index}>
                    <TableCell className="whitespace-nowrap">{key}</TableCell>
                    <TableCell className="flex justify-end">
                      {value as string}
                    </TableCell>
                  </TableRow>
                );
            }
          })}
        </TableBody>
      )}
    </Table>
  ));
}

export default ProductsMobileTable;

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User as Product,
  Chip,
  Tooltip,
  ChipProps,
  getKeyValue,
} from "@nextui-org/react";

import { columns } from "./data";
import { Delete, DeleteIcon, EditIcon, EyeIcon } from "lucide-react";
import {
  RiDeleteBack2Fill,
  RiDeleteBin2Line,
  RiDeleteBin5Fill,
} from "react-icons/ri";
import { mapTypes } from "../SelectType";

export const typeColorMap: Record<string, ChipProps["color"]> = {
  micro: "success",
  string: "warning",
  hybrid: "primary",
};

export type Product = {
  id: number;
  model: string;
  serialNumber: string;
  type: string;
  description: string;
  alert: string[];
};

type Props = {
  products: Product[];
  onOpen: () => void;
  isEditId: number;
  setIsEditId: React.Dispatch<React.SetStateAction<number>>;
  handleDelete: React.Dispatch<React.SetStateAction<number>>;
};

export default function ProductsTable({
  products,
  onOpen,
  setIsEditId,
  handleDelete,
}: Props) {
  const handleEdit = (id: number) => {
    setIsEditId(id);
    onOpen();
  };

  const renderCell = React.useCallback(
    (product: Product, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof Product];

      switch (columnKey) {
        case "model":
          return (
            <Product
              avatarProps={{
                className: "hidden",
              }}
              classNames={{ name: "uppercase"}}
              name={cellValue}
            />
          );
        case "type":
          return (
            <Chip
              className="capitalize -ml-1"
              color={typeColorMap[product.type]}
              size="sm"
              variant="flat"
            >
              {mapTypes[cellValue as never]}
            </Chip>
          );
        case "alert":
          return (
            <div className="relative flex flex-wrap -ml-1 gap-2">
              {product.alert.map((item, index) => (
                <Chip
                  key={`${item}-${index}`}
                  className="capitalize"
                  size="sm"
                  variant="flat"
                >
                  {(Array.from(cellValue as never) as never)[index]}
                </Chip>
              ))}
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center  gap-2">
              {/* <Tooltip content="Detalhes">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon className="max-h-[20px]" />
                </span>
              </Tooltip> */}
              <Tooltip content="Editar">
                <span
                  onClick={() => handleEdit(product.id)}
                  className="text-lg  text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon className="max-h-[20px]" />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Excluir">
                <span
                  onClick={() => handleDelete(product.id)}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <RiDeleteBin2Line className="max-h-[20px]" />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table
      removeWrapper
      className="max-lg:hidden"
      aria-label="Example table with custom cells"
      classNames={{
        tbody:`${products[0].model === "" ? "[&_td]:[&_*]:!h-12" : "" }`
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"Nenhum produto adicionado."}
        
        items={products[0].model === "" ? [] : products}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

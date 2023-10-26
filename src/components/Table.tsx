"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { GripVertical } from "lucide-react";
import { ChevronDownIcon } from "lucide-react";
import { SearchIcon } from "lucide-react";
import { columns, warranties, statusOptions } from "@/utils/dataTemp";
import { capitalize } from "@/utils/capitalize";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Backend_URL } from "@/lib/Constants";
import transformArray from "@/utils/transformWarranty";
import { WarrantyData } from "@/types/warranty.type";
import { FormattedWarranty } from "@/types/FormattedWarranty.type";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { mapGroups } from "@/utils/mapGroupsFromBack";

const statusColorMap: Record<string, ChipProps["color"]> = {
  WAITING_FOR_APPROVAL: "warning",
  INVERTER_TO_REPAIR: "secondary",
  INVERTER_TO_REPLACE: "success",
  INVERTER_CLOSED: "success",
  RETURN_BID: "success",
  INVERTER_REVERSE_PICKUP: "success",
  INVERTER_IN_TRANSPORT: "success",
  TOTAL_LOSS: "success",
  INVERTER_RECEIVED: "success",
  WAITING_BOARD: "success",
  MI_TO_REPAIR: "success",
  ABANDONED_BY_CUSTOMER: "success",
  INVERTER_RETURN: "success",
  MI_TO_REPLACE: "success",
  MI_IN_TRANSPORT: "success",
  MI_RECEIVED: "success",
  MI_RETURN: "success",
  MI_CLOSED: "success",
  ALDO_DEBT: "success",
  WITHOUT_IDENTIFICATION: "success",
  BELENERGY_DEBT: "success",
  EDELTEC_DEBT: "success",
  SOOLLAR_DEBT: "success",
  BONIFICAÇÃO: "success",
  DEMONSTRAÇÃO: "success",
};

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "author",
  "serialNumber",
  "approvalDate",
  "createdAt",
  "warrantyType",
  "model",
  "model",
  "status",
  "actions",
];

type User = FormattedWarranty;

type Props = {
  warrantiesList: WarrantyData[];
};

export default function WarrantiesTable({ warrantiesList }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const formattedWarranties: User[] = React.useMemo(() => {
    if (warrantiesList) return transformArray(warrantiesList);
    return [
      {
        id: 0,
        status: "WAITING_FOR_APPROVAL",
        caseOrigin: "",
        createdAt: "2023-10-18T15:06:41.103Z",
        approvalDate: "2023-10-18T15:06:41.103Z",
        reasonToDisapprove: "",
        warrantyType: "",
        comments: "ERRO",
        priority: null,
        author: "",
        authorTitle: "",
        serialNumber: "",
        model: "",
      },
    ];
  }, [warrantiesList]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredWarranties = [...formattedWarranties];

    if (hasSearchFilter) {
      filteredWarranties = filteredWarranties.filter((warranty) =>
        warranty.author.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredWarranties = filteredWarranties.filter((warranty) =>
        Array.from(statusFilter).includes(warranty.status)
      );
    }
    return filteredWarranties;
  }, [formattedWarranties, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const sortedItems = React.useMemo(() => {
    const sortedItems = [...filteredItems].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });

    return sortedItems;
  }, [sortDescriptor, filteredItems]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end);
  }, [page, sortedItems, rowsPerPage]);

  const renderCell = React.useCallback(
    (warranty: User, columnKey: React.Key) => {
      const cellValue = warranty[columnKey as keyof User];

      switch (columnKey) {
        case "author":
          return (
            <User
              classNames={{
                description: "text-default-500",
              }}
              avatarProps={{}}
              description={warranty.authorTitle}
              name={cellValue}
            >
              {warranty.authorTitle}
            </User>
          );
        case "model":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-500">
                {warranty.model}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[warranty.status]}
              size="sm"
              variant="dot"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown className="bg-background border-1 border-default-200">
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <GripVertical className="text-default-400" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      if (session) {
                        const { role, group, department } = session.user.sub;
                        router.push(
                          `/${mapGroups(role)}/${mapGroups(
                            group
                          )}/dashboard/${mapGroups(department)}/garantias/${
                            warranty.id
                          }`
                        );
                      }
                    }}
                  >
                    Vizualizar
                  </DropdownItem>
                  <DropdownItem>Editar</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Procurar por nome..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
                className="max-h-[50vh] overflow-y-scroll mt-2"
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Colunas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {formattedWarranties.length} garantias
          </span>
          <div className="flex items-center justify-between min-w-[200px] text-default-400 text-small">
            <Select
              variant="underlined"
              label="Garantias por página:"
              labelPlacement="outside-left"
              classNames={{
                label: "text-default-400 min-w-[100px] my-auto",
                trigger: "max-w-[80px] ml-auto",
                value: "text-center",
              }}
              size="sm"
              defaultSelectedKeys={["10"]}
              onChange={onRowsPerPageChange}
              className="self-end"
            >
              <SelectItem key="5" value="5">
                5
              </SelectItem>
              <SelectItem key="10" value="10">
                10
              </SelectItem>
              <SelectItem key="20" value="20">
                20
              </SelectItem>
            </Select>
            {/* <select
              className="bg-transparent px-1 outline-nonetext-default-400 text-small"
              onChange={onRowsPerPageChange}
              defaultValue={10}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select> */}
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    warranties.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        {/* <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span> */}
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[302px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode="none"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Garantia não encontrada"} items={items}>
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

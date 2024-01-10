import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { LucideCloudDrizzle } from "lucide-react";
import React, { ChangeEvent, useEffect } from "react";
import UploadInput from "./UploadInput";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { ProductType } from "../step2/Step2";
import StringTests from "./StringTests";
import MicroTests from "./MicroTests";
import HybridTests from "./HybridTests";
import { mapTypes } from "../step2/SelectType";
import { KeysOfInitialState, initialMicroState } from "../CreateWarranty";
import { UseFormReturn } from "react-hook-form";
import useFormStep3, {
  FormStep3Type,
  ProductForm3Values,
} from "./useFormStep3";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import UploadImage from "./UploadImage";

export type MicroSelected = typeof initialMicroState;

type Props = {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  productList: ProductType[];
  setProductList: React.Dispatch<React.SetStateAction<ProductType[]>>;
  microTestsIsSelected: MicroSelected[];
  microTestsSetIsSelected: React.Dispatch<
    React.SetStateAction<MicroSelected[]>
  >;
  formStep3: UseFormReturn<FormStep3Type, any, undefined>;
  onSubmitHandler: (data: ProductForm3Values) => Promise<void>;
};

const fileTypeMapping = {
  micro: "microFiles",
  hybrid: "hybridFiles",
  string: "stringFiles",
};

function Step3({
  productList,
  setProductList,
  setSelected,
  microTestsIsSelected,
  microTestsSetIsSelected,
  formStep3,
  onSubmitHandler,
}: Props) {
  const [productSelected, setProductSelected] = React.useState("product-1");
  const RenderTestType = (type: "string" | "micro" | "hybrid", id: number) => {
    switch (type) {
      case "string":
        return (
          <StringTests
            formStep3={formStep3}
            isSelected={microTestsIsSelected}
            setIsSelected={microTestsSetIsSelected}
            id={id}
          />
        );
      case "micro":
        return (
          <MicroTests
            formStep3={formStep3}
            isSelected={microTestsIsSelected}
            setIsSelected={microTestsSetIsSelected}
            id={id}
          />
        );
      case "hybrid":
        return (
          <HybridTests
            formStep3={formStep3}
            isSelected={microTestsIsSelected}
            setIsSelected={microTestsSetIsSelected}
            id={id}
          />
        );
      default:
        return (
          <div className="flex flex-col gap-2 min-h-[65vh]">
            Volte um passo e selecione o produto
          </div>
        );
    }
  };

  // const handleIsSelected = (item: KeysOfInitialState) => {
  //   const unitSelected = microTestsIsSelected.find((selected) => selected.id === id);

  //   return unitSelected![item];
  // };

  useEffect(() => {
    if (productList[0].model === "") {
      return;
    } else {
      productList.forEach((product) => {
        const indexId = product.id - 1;
        // console.log(indexId)

        switch (product.type) {
          case "micro":
            formStep3.setValue(`products.${indexId}.hybridFiles`, []);
            formStep3.setValue(`products.${indexId}.stringFiles`, []);
            for (let i = 0; i <= 5; i += 1) {
              // console.log(i + "step3")
              if (
                !formStep3.watch(`products.${indexId}.microFiles.${i}.content`)
              ) {
                formStep3.setValue(
                  `products.${indexId}.microFiles.${i}.content`,
                  undefined,
                  {
                    shouldDirty: true,
                  }
                );
              }
            }
            return;
          case "hybrid":
            formStep3.setValue(`products.${indexId}.microFiles`, []);
            formStep3.setValue(`products.${indexId}.stringFiles`, []);
            for (let i = 0; i <= 20; i += 1) {
              // console.log(i + "step3")
              if (
                !formStep3.watch(`products.${indexId}.hybridFiles.${i}.content`)
              ) {
                formStep3.setValue(
                  `products.${indexId}.hybridFiles.${i}.content`,
                  undefined,
                  {
                    shouldDirty: true,
                  }
                );
              }
            }
            return;
          case "string":
            formStep3.setValue(`products.${indexId}.hybridFiles`, []);
            formStep3.setValue(`products.${indexId}.microFiles`, []);
            for (let i = 0; i <= 8; i += 1) {
              // console.log(i + "step3")
              if (
                !formStep3.watch(`products.${indexId}.stringFiles.${i}.content`)
              ) {
                formStep3.setValue(
                  `products.${indexId}.stringFiles.${i}.content`,
                  undefined,
                  {
                    shouldDirty: true,
                  }
                );
              }
            }
            return;
        }
      });
    }
  }, [productList]);

  const onStep3Error = () => {
    console.log(formStep3.formState.errors);
  };
  return (
    <Form {...formStep3}>
      <form
        onSubmit={formStep3.handleSubmit(onSubmitHandler, onStep3Error)}
        className="flex flex-col min-h-[65vh]"
      >
        {productList[0].model === "" ? (
          <div className="flex flex-col gap-2 min-h-[65vh]">
            Volte um passo e selecione o produto
          </div>
        ) : (
          <>
            <Tabs
              fullWidth
              size="lg"
              aria-label="Tabs products"
              variant="underlined"
              selectedKey={productSelected}
              onSelectionChange={(e) => setProductSelected(e as string)}
              classNames={{
                tab: "py-12 sm:py-7 px-2 text-sm sm:text-lg",
                base: "py-0 sm:py-3",
                tabContent: "whitespace-break-spaces line-clamp-3",
              }}
            >
              {productList.map((product, index) => (
                <Tab
                  key={`product-${index + 1}`}
                  title={
                    <>
                      <h5
                        className={`${
                          Object.keys(
                            formStep3.getFieldState(`products.${index}`)
                              .error || {}
                          ).length > 0
                            ? "after:content-['_*'] after:text-red-500"
                            : ""
                        }`}
                      >{`Produto Nº ${index + 1} (${
                        mapTypes[product.type as never]
                      })`}</h5>
                      {Object.keys(
                        formStep3.getFieldState(`products.${index}`).error || {}
                      ).length > 0 ? (
                        <span className="text-red-500 text-sm">
                          {" "}
                          Algum campo não foi preenchido corretamente
                        </span>
                      ) : null}
                    </>
                  }
                >
                  <div className="flex flex-col gap-5">
                    {RenderTestType(product.type as never, product.id)}
                  </div>
                </Tab>
              ))}
            </Tabs>

            <div className="flex mt-auto gap-2 justify-center">
              <Button
                color="primary"
                type="submit"
                onPress={() => setSelected("step-3")}
              >
                Confirmar
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
}

export default Step3;

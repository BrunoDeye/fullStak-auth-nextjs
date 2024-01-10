import { useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormStep3Type } from "../useFormStep3";
import { useFileStore } from "@/store/fileList";

function usePrevious(value: boolean) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}

export default function useDirtyFields(
  isFieldSelected: boolean,
  indexId: number,
  formStep3: UseFormReturn<FormStep3Type, any, undefined>,
  initialIndex: number,
  finalIndex: number,
  filesTypeKey: "microFiles" | "hybridFiles" | "stringFiles"
) {
  const [removeFile] = useFileStore(state => [state.removeFile])
  const prevSelected = usePrevious(isFieldSelected);
  useEffect(() => {
    // console.log(prevSelected === isFieldSelected)

    if (prevSelected === isFieldSelected) {
      return;
    } else if (isFieldSelected) {
      for (let i = initialIndex; i <= finalIndex; i += 1) {
        // console.log(`products.${indexId}.${filesTypeKey}.${i}.content`);
        formStep3.setValue(
          `products.${indexId}.${filesTypeKey}.${i}.content`,
          undefined,
        );
      }
    } else if (isFieldSelected === false && formStep3.watch("products")) {

      for (let i = initialIndex; i <= finalIndex; i += 1) {
        // console.log(`products.${indexId}.${filesTypeKey}.${i}.content`);
        removeFile(`products.${indexId}.${filesTypeKey}.${i}.content`);
      }


      formStep3.reset((prev) => {
        const productsArrayTemp = [...prev.products];
        const newProductsArray = productsArrayTemp.map((product, index) => {
          if (index === indexId) {
            const newFilesArray = [...product[filesTypeKey]];

            const newArray = new Array(newFilesArray.length);
            for (let i = 0; i < newFilesArray.length; i += 1) {
              if ((i < initialIndex || i > finalIndex) && newFilesArray[i]) {
                newArray[i] = newFilesArray[i];
              }
            }
            return { ...product, [filesTypeKey]: newArray };
          } else {
            return product;
          }
        });
        return { products: newProductsArray };
      });
    }
  }, [isFieldSelected]);
}

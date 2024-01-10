import {
  Accordion,
  AccordionItem,
  Checkbox,
  Input,
  select,
} from "@nextui-org/react";
import React, { ChangeEvent, useEffect, useMemo } from "react";
import UploadInput from "./UploadInput";
import { AiOutlineCheck } from "react-icons/ai";
import { MicroSelected } from "./Step3";
import { KeysOfInitialState } from "../CreateWarranty";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useFormStep3, { FormStep3Type } from "./useFormStep3";
import UploadImage from "./UploadImage";
import { UseFormReturn } from "react-hook-form";
import Image from "next/image";
import Dropzone from "./upload/Dropzone";
import { useFileStore } from "@/store/fileList";
import { CheckCheck } from "lucide-react";
import useDirtyFields from "./hooks/useDirtyFields";

type Props = {
  isSelected: MicroSelected[];
  setIsSelected: React.Dispatch<React.SetStateAction<MicroSelected[]>>;
  id: number;
  formStep3: UseFormReturn<FormStep3Type, any, undefined>;
};

function MicroTests({
  isSelected,
  setIsSelected,
  id,
  formStep3,
}: Props) {
  const indexId = useMemo(() => id - 1, []);
  const [removeAll, removeFile] = useFileStore((state) => [state.removeAll, state.removeFile]);
  const handleIsSelected = (item: KeysOfInitialState) => {
    const unitSelected = isSelected.find((selected) => selected.id === id);
    return unitSelected![item];
  };

  const handleSetIsSelected = React.useMemo(
    () => (item: KeysOfInitialState) => (isSelected: boolean) => {
      setIsSelected((prevState) => {
        const unitSelected = prevState.find((selected) => selected.id === id);
        const stateWithoutSelected = prevState.filter(
          (select) => select.id !== id
        );
        return [
          ...stateWithoutSelected,
          { ...unitSelected!, [item]: isSelected },
        ];
      });
    },
    []
  );

  const IconCheckbox = useMemo(() => <i className="">✓</i>, []);

  const TitleCheckbox = (key: KeysOfInitialState, title: string) => (
    <h4 className="mt-3">
      <Checkbox
        size="lg"
        isSelected={handleIsSelected(key)}
        onValueChange={handleSetIsSelected(key)}
        icon={IconCheckbox}
        color="default"
        className="data-[selected=true]:[--nextui-default:white] me-5"
        classNames={{
          icon: "leading-none",
          wrapper: "before:!border-gray-300",
          label: "font-bold",
        }}
      >
        {title}
      </Checkbox>
    </h4>
  );

  // useEffect(() => {
  //   for (let i = 0; i <= 5; i += 1) {
  //     if (!formStep3.watch(`products.${indexId}.microFiles.${i}.content`)) {
  //       formStep3.setValue(
  //         `products.${indexId}.microFiles.${i}.content`,
  //         undefined,
  //         {
  //           shouldDirty: true,
  //         }
  //       );
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (handleIsSelected("doesntTurnOn")) {
  //     for (let i = 6; i <= 10; i += 1) {
  //       formStep3.setValue(
  //         `products.${indexId}.microFiles.${i}.content`,
  //         undefined,
  //         {
  //           shouldDirty: true,
  //         }
  //       );
  //     }
  //   } else {
  //     formStep3.reset((prev) => {
  //       const productsArrayTemp = [...prev.products];
  //       // const newMicroFilesArray = [...prev.microFiles]
  //       // newMicroFilesArray.splice(6, 5);
  //       const newProductsArray = productsArrayTemp.map((product, index) => {
  //         if (index === indexId) {
  //           const newMicroFilesArray = [...product.microFiles];
  //           newMicroFilesArray.splice(6, 5);

  //           return { ...product, microFiles: newMicroFilesArray };
  //         } else {
  //           return product;
  //         }
  //       });
  //       return { products: newProductsArray };
  //     });
  //   }
  // }, [handleIsSelected("doesntTurnOn")]);

  useDirtyFields(
    handleIsSelected("doesntTurnOn"),
    indexId,
    formStep3,
    6, // key inicial
    10, // key final
    "microFiles"
  );

  useDirtyFields(
    handleIsSelected("noPV"),
    indexId,
    formStep3,
    11, // key inicial
    13, // key final
    "microFiles"
  );

  useDirtyFields(
    handleIsSelected("doesntEmitAP"),
    indexId,
    formStep3,
    14, // key inicial
    17, // key final
    "microFiles"
  );
  useDirtyFields(
    handleIsSelected("doesntIdentify"),
    indexId,
    formStep3,
    18, // key inicial
    21, // key final
    "microFiles"
  );
  useDirtyFields(
    handleIsSelected("doesntConnect"),
    indexId,
    formStep3,
    22, // key inicial
    22, // key final
    "microFiles"
  );
  // console.log(formStep3.formState.errors);
  // console.log( formStep3.watch(`products.${indexId}`))
  return (
    <>
      <h4 className="text-center">
        Documentações para entrada de análise de garantia (Microinversores)
      </h4>
      <p className="text-justify">
        Para a abertura do processo de análise de garantia é{" "}
        <strong className="">OBRIGATÓRIO</strong> o envio dos itens a seguir
        para o engenheiro responsável pelo caso na Deye. Após a análise das
        documentações você será posicionado caso seja aprovado ou reprovado o
        processo de garantia. Quaisquer dúvidas que tenha, entre em contato com
        a nossa central de Engenharia de Suporte no número: (11) 2500-0681.
      </p>
      <p className="text-justify ">
        <strong className="text-red-500">Observação:</strong>{" "}
        <strong>
          Em caso de possíveis dúvidas ou empecilhos na realização dos testes de
          garantia informar ao responsável pelo atendimento.
        </strong>
      </p>

      <h5 className="mt-3">
        <strong>✓ Itens obrigatórios para todos os defeitos</strong>
      </h5>

      <Accordion>
        <AccordionItem
          key="1"
          aria-label="Nota fiscal de compra."
          title={`Nota fiscal de compra.`}
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.microFiles.0.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          startContent="1."
          className={`${
            formStep3.getFieldState(`products.${indexId}.microFiles.0.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.microFiles.0.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.microFiles.0.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.microFiles.0.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }
            `,
            subtitle: "text-red-500",
          }}
        >
          <div className="flex flex-col gap-2 p-5">
            <FormField
              control={formStep3.control}
              name={`products.${indexId}.microFiles.0.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                    formStep3={formStep3}
                      type={["pdf", "image", "audio"]}
                      onFormsChange= {field.onChange}
                      id={`products.${indexId}.microFiles.0`}
                      code={10101}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />

            {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
          </div>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Diagrama unifilar."
          title="Diagrama unifilar."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.microFiles.1.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          startContent="2."
          className={`${
            formStep3.getFieldState(`products.${indexId}.microFiles.1.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.microFiles.1.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.microFiles.1.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.microFiles.1.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
            control={formStep3.control}
            name={`products.${indexId}.microFiles.1.content`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropzone
                  formStep3={formStep3}
                    onFormsChange={field.onChange}
                    id={`products.${indexId}.microFiles.1`}
                    code={10102}
                  />
                </FormControl>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Datasheet dos módulos."
          title="Datasheet dos módulos."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.microFiles.2.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          startContent="3."
          className={`${
            formStep3.getFieldState(`products.${indexId}.microFiles.2.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.microFiles.2.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.microFiles.2.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.microFiles.2.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
            control={formStep3.control}
            name={`products.${indexId}.microFiles.2.content`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropzone
                  formStep3={formStep3}
                    onFormsChange={field.onChange}
                    id={`products.${indexId}.microFiles.2`}
                    code={10103}
                  />
                </FormControl>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Foto da etiqueta com o número de série (SN) do Microinversor."
          title="Foto da etiqueta com o número de série (SN) do Microinversor."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.microFiles.3.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          startContent="4."
          className={`${
            formStep3.getFieldState(`products.${indexId}.microFiles.3.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.microFiles.3.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.microFiles.3.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.microFiles.3.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
            control={formStep3.control}
            name={`products.${indexId}.microFiles.3.content`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropzone
                  formStep3={formStep3}
                    onFormsChange={field.onChange}
                    id={`products.${indexId}.microFiles.3`}
                    code={10104}
                  />
                </FormControl>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="5"
          aria-label="Vídeo amplo do local da instalação."
          title="Vídeo amplo do local da instalação."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.microFiles.4.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          startContent="5."
          className={`${
            formStep3.getFieldState(`products.${indexId}.microFiles.4.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.microFiles.4.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.microFiles.4.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.microFiles.4.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
            control={formStep3.control}
            name={`products.${indexId}.microFiles.4.content`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropzone
                  formStep3={formStep3}
                    onFormsChange={field.onChange}
                    id={`products.${indexId}.microFiles.4`}
                    code={10105}
                  />
                </FormControl>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="6"
          aria-label="Foto da stringbox CA aberta."
          title="Foto da stringbox CA aberta."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.microFiles.5.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          startContent="6."
          className={`${
            formStep3.getFieldState(`products.${indexId}.microFiles.5.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.microFiles.5.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.microFiles.5.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.microFiles.5.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
            control={formStep3.control}
            name={`products.${indexId}.microFiles.5.content`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropzone
                  formStep3={formStep3}
                    onFormsChange={field.onChange}
                    id={`products.${indexId}.microFiles.5`}
                    code={10106}
                  />
                </FormControl>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
      </Accordion>

      <p className="text-red-500 text-justify">
        <strong>
          POR FAVOR, MARQUE AS CAIXAS CORRESPONDENTES AOS ERROS QUE O
          MICROINVERSOR ESTÁ APRESENTANDO. OS TESTES ADICIONAIS A SEGUIR SÃO
          VARIÁVEIS DE ACORDO COM A NATUREZA DO ERRO ASSINALADO. QUAISQUER
          DÚVIDAS, ENTRAR EM CONTATO COM O ENGENHEIRO RESPONSÁVEL.
        </strong>
      </p>

      {/* >>>>>>>>>>MICRO NAO LIGA<<<<<<<<<<<<<<< */}
      {handleIsSelected("doesntTurnOn") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Microinversor não liga"
            title={TitleCheckbox("doesntTurnOn", "Microinversor não liga")}
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Enviar vídeo dos leds do micro com os módulos conectados."
                  title="Enviar vídeo dos leds do micro com os módulos conectados."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.6.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="1."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.6.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.6.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.6.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.6.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.6.content`}
                    render={({ field }) => {
                      field.disabled = !handleIsSelected("doesntTurnOn");

                      return (
                        <FormItem>
                          <FormControl>
                            <Dropzone
                            formStep3={formStep3}
                              onFormsChange={field.onChange}
                              id={`products.${indexId}.microFiles.6`}
                              code={10201}
                            />
                          </FormControl>
                          <FormMessage className="ml-2" />
                        </FormItem>
                      );
                    }}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Enviar vídeo medindo tensão CC na ponta de todos os MC4s dos módulos, mostrando bem
                  as ponteiras e visor do multímetro."
                  title="Enviar vídeo medindo tensão CC na ponta de todos os MC4s dos módulos, mostrando bem
                  as ponteiras e visor do multímetro."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.7.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="2."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.7.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.7.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.7.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.7.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.7.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.7`}
                            code={10202}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra."
                  title="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.8.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="3."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.8.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.8.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.8.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.8.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.8.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.8`}
                            code={10203}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
                <AccordionItem
                  key="4"
                  aria-label="Verificar se houve inversão de TERRA e NEUTRO."
                  title="Verificar se houve inversão de TERRA e NEUTRO."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.9.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="4."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.9.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.9.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.9.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.9.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.9.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.9`}
                            code={10204}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
                <AccordionItem
                  key="5"
                  aria-label="Enviar vídeo testando continuidade em todas as entradas CC do Microinversor."
                  title="Enviar vídeo testando continuidade em todas as entradas CC do Microinversor."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.10.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="5."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.10.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.10.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.10.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.10.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.10.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.10`}
                            code={10205}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
              </Accordion>
            </div>
          </AccordionItem>
        </Accordion>
      ) : (
        <h4 className="mt-3 p-2 py-4">
          <Checkbox
            size="lg"
            isSelected={handleIsSelected("doesntTurnOn")}
            onValueChange={handleSetIsSelected("doesntTurnOn")}
            icon={IconCheckbox}
            color="default"
            className="data-[selected=true]:[--nextui-default:white] "
            classNames={{
              icon: "leading-none ",
              wrapper: "before:!border-gray-300",
              label: "font-bold",
            }}
          >
            Microinversor não liga
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>MICRO NAO LIGA<<<<<<<<<<<<<<< */}

      {/* >>>>>>>>>>PV SEM GERAÇÃO<<<<<<<<<<<<<<< */}
      {handleIsSelected("noPV") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="PV sem geração"
            title={TitleCheckbox("noPV", "PV sem geração")}
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Enviar vídeo medindo tensão CC na ponta de todos os MC4s dos módulos, mostrando bem
                  as ponteiras e visor do multímetro."
                  title="Enviar vídeo medindo tensão CC na ponta de todos os MC4s dos módulos, mostrando bem
                  as ponteiras e visor do multímetro."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.11.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="1."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.11.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.11.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.11.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.11.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.11.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.11`}
                            code={10301}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra."
                  title="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.12.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="2."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.12.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.12.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.12.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.12.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.12.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.12`}
                            code={10302}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="Enviar vídeo testando continuidade em todas as entradas CC do Microinversor."
                  title="Enviar vídeo testando continuidade em todas as entradas CC do Microinversor."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.13.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="3."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.13.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.13.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.13.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.13.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.13.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.13`}
                            code={10303}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
              </Accordion>
            </div>
          </AccordionItem>
        </Accordion>
      ) : (
        <h4 className="mt-3 p-2 py-4">
          <Checkbox
            size="lg"
            isSelected={handleIsSelected("noPV")}
            onValueChange={handleSetIsSelected("noPV")}
            icon={IconCheckbox}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none ",
              wrapper: "before:!border-gray-300",
              label: "font-bold",
            }}
          >
            PV sem geração
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>PV SEM GERAÇÃO<<<<<<<<<<<<<<< */}

      {/* >>>>>>>>>>MICRO NAO EMITE AP<<<<<<<<<<<<<<< */}
      {handleIsSelected("doesntEmitAP") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Microinversor não emite rede AP_"
            title={TitleCheckbox(
              "doesntEmitAP",
              "Microinversor não emite rede AP_"
            )}
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Desligar/ Desconectar os módulos por 10 minutos e religar."
                  title="Desligar/ Desconectar os módulos por 10 minutos e religar."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.14.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="1."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.14.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.14.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.14.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.14.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.14.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.14`}
                            code={10401}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Enviar vídeo dos leds do micro com os módulos conectados."
                  title="Enviar vídeo dos leds do micro com os módulos conectados."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.15.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="2."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.15.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.15.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.15.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.15.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.15.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.15`}
                            code={10402}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="Enviar foto da tela do celular na área de Wifi."
                  title="Enviar foto da tela do celular na área de Wifi."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.16.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="3."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.16.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.16.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.16.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.16.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.16.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.16`}
                            code={10403}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
                <AccordionItem
                  key="4"
                  aria-label="Inverter a antena de conexão Wifi com a de outro microinversor
                  normalizado."
                  title="Inverter a antena de conexão Wifi com a de outro microinversor
                  normalizado."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.17.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="4."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.17.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.17.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.17.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.17.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.17.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.17`}
                            code={10404}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
              </Accordion>
            </div>
          </AccordionItem>
        </Accordion>
      ) : (
        <h4 className="mt-3 p-2 py-4">
          <Checkbox
            size="lg"
            isSelected={handleIsSelected("doesntEmitAP")}
            onValueChange={handleSetIsSelected("doesntEmitAP")}
            icon={IconCheckbox}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none ",
              wrapper: "before:!border-gray-300",
              label: "font-bold",
            }}
          >
            Microinversor não emite rede AP_
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>MICRO NAO EMITE AP<<<<<<<<<<<<<<< */}

      {/* >>>>>>>>>>MICRO NAO IDENTIFICA CA<<<<<<<<<<<<<<< */}
      {handleIsSelected("doesntIdentify") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Microinversor não identifica rede CA"
            title={TitleCheckbox(
              "doesntIdentify",
              "Microinversor não identifica rede CA"
            )}
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Enviar vídeo dos leds do micro com os módulos conectados."
                  title="Enviar vídeo dos leds do micro com os módulos conectados."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.18.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="1."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.18.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.18.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.18.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.18.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.18.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.18`}
                            code={10501}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra."
                  title="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.19.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="2."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.19.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.19.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.19.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.19.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.19.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.19`}
                            code={10502}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="Verificar se houve inversão de TERRA e NEUTRO."
                  title="Verificar se houve inversão de TERRA e NEUTRO."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.20.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="3."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.20.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.20.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.20.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.20.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.20.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.20`}
                            code={10503}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
                <AccordionItem
                  key="4"
                  aria-label="Enviar vídeo testando continuidade em ambas entradas CA do Microinversor."
                  title="Enviar vídeo testando continuidade em ambas entradas CA do Microinversor."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.21.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="4."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.21.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.21.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.21.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.21.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.21.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.21`}
                            code={10504}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
              </Accordion>
            </div>
          </AccordionItem>
        </Accordion>
      ) : (
        <h4 className="mt-3 p-2 py-4">
          <Checkbox
            size="lg"
            isSelected={handleIsSelected("doesntIdentify")}
            onValueChange={handleSetIsSelected("doesntIdentify")}
            icon={IconCheckbox}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none",
              wrapper: "before:!border-gray-300",
              label: "font-bold",
            }}
          >
            Microinversor não identifica rede CA
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>MICRO NAO IDENTIFICA CA<<<<<<<<<<<<<<< */}

      {/* >>>>>>>>>>MICRO NA CONECTA WIFI<<<<<<<<<<<<<<< */}
      {handleIsSelected("doesntConnect") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Microinversor não conecta à rede Wifi"
            title={TitleCheckbox(
              "doesntConnect",
              "Microinversor não conecta à rede Wifi"
            )}
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Conectar-se à rede AP_ do microinversor com a senha 12345678, e no navegador nas
                  configurações da página 10.10.100.254, enviar um PRINT da aba STATUS, com os ícones
                  DEVICE INFORMATION e REMOTE SERVER INFORMATION expandidos."
                  title="Conectar-se à rede AP_ do microinversor com a senha 12345678, e no navegador nas
                  configurações da página 10.10.100.254, enviar um PRINT da aba STATUS, com os ícones
                  DEVICE INFORMATION e REMOTE SERVER INFORMATION expandidos."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.22.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  startContent="1."
                  className={`${
                    formStep3.getFieldState(
                      `products.${indexId}.microFiles.22.content`
                    ).error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.microFiles.22.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.microFiles.22.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.microFiles.22.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }`,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.microFiles.22.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.microFiles.22`}
                            code={10601}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  {/* <Input
                    isRequired
                    label="Nome"
                    placeholder="Seu nome"
                    type="text"
                  /> */}
                </AccordionItem>
              </Accordion>
            </div>
          </AccordionItem>
        </Accordion>
      ) : (
        <h4 className="my-3 p-2 py-4">
          <Checkbox
            size="lg"
            isSelected={handleIsSelected("doesntConnect")}
            onValueChange={handleSetIsSelected("doesntConnect")}
            icon={IconCheckbox}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none",
              wrapper: "before:!border-gray-300",
              label: "font-bold",
            }}
          >
            Microinversor não conecta à rede Wifi
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>MICRO NA CONECTA WIFI<<<<<<<<<<<<<<< */}
    </>
  );
}

export default MicroTests;

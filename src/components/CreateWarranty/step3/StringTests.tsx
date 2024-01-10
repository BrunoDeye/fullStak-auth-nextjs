import { Accordion, AccordionItem, Checkbox, Input } from "@nextui-org/react";
import React, { useMemo } from "react";
import UploadInput from "./UploadInput";
import { MicroSelected } from "./Step3";
import { KeysOfInitialState } from "../CreateWarranty";
import { UseFormReturn } from "react-hook-form";
import { FormStep3Type } from "./useFormStep3";
import useDirtyFields from "./hooks/useDirtyFields";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Dropzone from "./upload/Dropzone";

type Props = {
  isSelected: MicroSelected[];
  setIsSelected: React.Dispatch<React.SetStateAction<MicroSelected[]>>;
  id: number;
  formStep3: UseFormReturn<FormStep3Type, any, undefined>;
};

function StringTests({ isSelected, setIsSelected, id, formStep3 }: Props) {
  const indexId = useMemo(() => id - 1, []);
  const handleIsSelected = (item: KeysOfInitialState) => {
    const unitSelected = isSelected.find((selected) => selected.id === id);

    return unitSelected![item];
  };

  const handleSetIsSelected =
    (item: KeysOfInitialState) => (isSelected: boolean) => {
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
    };

  useDirtyFields(
    handleIsSelected("doesntTurnOn"),
    indexId,
    formStep3,
    9, // key inicial
    13, // key final
    "stringFiles"
  );

  useDirtyFields(
    handleIsSelected("noCommunication"),
    indexId,
    formStep3,
    14, // key inicial
    15, // key final
    "stringFiles"
  );

  useDirtyFields(
    handleIsSelected("physicalDmg"),
    indexId,
    formStep3,
    16, // key inicial
    16, // key final
    "stringFiles"
  );

  useDirtyFields(
    handleIsSelected("f14"),
    indexId,
    formStep3,
    17, // key inicial
    20, // key final
    "stringFiles"
  );

  useDirtyFields(
    handleIsSelected("f19"),
    indexId,
    formStep3,
    21, // key inicial
    22, // key final
    "stringFiles"
  );

  useDirtyFields(
    handleIsSelected("f23"),
    indexId,
    formStep3,
    23, // key inicial
    25, // key final
    "stringFiles"
  );

  useDirtyFields(
    handleIsSelected("f30"),
    indexId,
    formStep3,
    26, // key inicial
    27, // key final
    "stringFiles"
  );

  useDirtyFields(
    handleIsSelected("f35"),
    indexId,
    formStep3,
    28, // key inicial
    30, // key final
    "stringFiles"
  );

  useDirtyFields(
    handleIsSelected("f55"),
    indexId,
    formStep3,
    31, // key inicial
    33, // key final
    "stringFiles"
  );

  useDirtyFields(
    handleIsSelected("f64"),
    indexId,
    formStep3,
    34, // key inicial
    35, // key final
    "stringFiles"
  );

  useDirtyFields(
    handleIsSelected("standby"),
    indexId,
    formStep3,
    36, // key inicial
    37, // key final
    "stringFiles"
  );

  useDirtyFields(
    handleIsSelected("noise"),
    indexId,
    formStep3,
    38, // key inicial
    40, // key final
    "stringFiles"
  );



  return (
    <>
      <h4 className="text-center">
        Documentações para entrada de análise de garantia (Inversores String
        Monofásico e Trifásico)
      </h4>
      <p className="text-justify">
        Para a abertura do processo de análise de garantia é{" "}
        <strong className="">OBRIGATÓRIO</strong> o envio dos itens a seguir
        para o engenheiro responsável pelo caso na Deye. Após a análise das
        documentações você será posicionado caso seja aprovado ou reprovado o
        processo de garantia. Quaisquer dúvidas que tenha, entre em contato com
        a nossa central de Engenharia de Suporte no número: (11) 2500-0681.
      </p>
      <p className="text-justify">
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
          title="Nota fiscal de compra."
          startContent="1."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.0.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.0.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.stringFiles.0.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.stringFiles.0.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.stringFiles.0.content`
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
              name={`products.${indexId}.stringFiles.0.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                    formStep3={formStep3}
                      type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.stringFiles.0`}
                      code={20101}
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
          startContent="2."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.1.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.1.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.stringFiles.1.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.stringFiles.1.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.stringFiles.1.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }
            `,
            subtitle: "text-red-500",
          }}
        >
          <FormField
            control={formStep3.control}
            name={`products.${indexId}.stringFiles.1.content`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropzone
                  formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                    onFormsChange={field.onChange}
                    id={`products.${indexId}.stringFiles.1`}
                    code={20102}
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
          startContent="3."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.2.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.2.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.stringFiles.2.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.stringFiles.2.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.stringFiles.2.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }
            `,
            subtitle: "text-red-500",
          }}
        >
          <FormField
            control={formStep3.control}
            name={`products.${indexId}.stringFiles.2.content`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropzone
                  formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                    onFormsChange={field.onChange}
                    id={`products.${indexId}.stringFiles.2`}
                    code={20103}
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
          aria-label="Foto da etiqueta lateral completa."
          title="Foto da etiqueta lateral completa."
          startContent="4."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.3.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.3.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.stringFiles.3.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.stringFiles.3.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.stringFiles.3.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }
            `,
            subtitle: "text-red-500",
          }}
        >
          <FormField
            control={formStep3.control}
            name={`products.${indexId}.stringFiles.3.content`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropzone
                  formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                    onFormsChange={field.onChange}
                    id={`products.${indexId}.stringFiles.3`}
                    code={20104}
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
          startContent="5."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.4.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.4.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.stringFiles.4.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.stringFiles.4.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.stringFiles.4.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }
            `,
            subtitle: "text-red-500",
          }}
        >
          <FormField
            control={formStep3.control}
            name={`products.${indexId}.stringFiles.4.content`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropzone
                  formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                    onFormsChange={field.onChange}
                    id={`products.${indexId}.stringFiles.4`}
                    code={20105}
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
          aria-label="Vídeo amplo do local da instalação dos módulos."
          title="Vídeo amplo do local da instalação dos módulos."
          startContent="6."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.5.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.5.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.stringFiles.5.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.stringFiles.5.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.stringFiles.5.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }
            `,
            subtitle: "text-red-500",
          }}
        >
          <FormField
            control={formStep3.control}
            name={`products.${indexId}.stringFiles.5.content`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropzone
                  formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                    onFormsChange={field.onChange}
                    id={`products.${indexId}.stringFiles.5`}
                    code={20106}
                  />
                </FormControl>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="7"
          aria-label="Foto da stringbox CA aberta."
          title="Foto da stringbox CA aberta."
          startContent="7."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.6.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.6.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.stringFiles.6.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.stringFiles.6.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.stringFiles.6.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }
            `,
            subtitle: "text-red-500",
          }}
        >
          <FormField
            control={formStep3.control}
            name={`products.${indexId}.stringFiles.6.content`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropzone
                  formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                    onFormsChange={field.onChange}
                    id={`products.${indexId}.stringFiles.6`}
                    code={20107}
                  />
                </FormControl>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="8"
          aria-label="Foto da stringbox CC (Se possuir)"
          title="Foto da stringbox CC (Se possuir)"
          startContent="8."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.7.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.7.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.stringFiles.7.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.stringFiles.7.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.stringFiles.7.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }
            `,
            subtitle: "text-red-500",
          }}
        >
          <FormField
            control={formStep3.control}
            name={`products.${indexId}.stringFiles.7.content`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropzone
                  formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                    onFormsChange={field.onChange}
                    id={`products.${indexId}.stringFiles.7`}
                    code={20108}
                  />
                </FormControl>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="9"
          aria-label="Datasheet do transformador (Se possuir)."
          title="Datasheet do transformador (Se possuir)."
          startContent="9."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.8.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.stringFiles.8.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.stringFiles.8.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.stringFiles.8.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.stringFiles.8.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }
            `,
            subtitle: "text-red-500",
          }}
        >
          <FormField
            control={formStep3.control}
            name={`products.${indexId}.stringFiles.8.content`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropzone
                  formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                    onFormsChange={field.onChange}
                    id={`products.${indexId}.stringFiles.8`}
                    code={20109}
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

      {/* >>>>>>>>>>NAO LIGA<<<<<<<<<<<<<<< */}
      {handleIsSelected("doesntTurnOn") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Inversor não liga"
            title={
              <h4 className="mt-3">
                <Checkbox
                  size="lg"
                  isSelected={handleIsSelected("doesntTurnOn")}
                  onValueChange={handleSetIsSelected("doesntTurnOn")}
                  icon={<span className="">✓</span>}
                  color="default"
                  className="data-[selected=true]:[--nextui-default:white] me-5"
                  classNames={{
                    icon: "leading-none w-4 ",
                    wrapper: "before:!border-gray-300",
                  }}
                >
                  <strong>Inversor não liga</strong>
                </Checkbox>
              </h4>
            }
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem
                  as ponteiras e visor do multímetro."
                  title="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem
                  as ponteiras e visor do multímetro."
                  startContent="1."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.9.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.9.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.9.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.9.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.9.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.9.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.9`}
                            code={20201}
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
                  aria-label="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e
                  neutro + terra."
                  title="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e
                  neutro + terra."
                  startContent="2."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.10.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.10.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.10.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.10.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.10.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.10.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.10`}
                            code={20202}
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
                  aria-label="Enviar foto da parte inferior do inversor mostrando as MPPTs."
                  title="Enviar foto da parte inferior do inversor mostrando as MPPTs."
                  startContent="3."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.11.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.11.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.11.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.11.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.11.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.11.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.11`}
                            code={20203}
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
                  aria-label="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, positivo + terra
                  (carcaçado inversor) e negativo + terra (carcaça do inversor), até estabilizar a
                  tensão no multímetro."
                  title="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, positivo + terra
                  (carcaçado inversor) e negativo + terra (carcaça do inversor), até estabilizar a
                  tensão no multímetro."
                  startContent="4."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.12.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.12.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.12.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.12.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.12.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.12.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.12`}
                            code={20204}
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
                  aria-label="Enviar vídeo testando continuidade nas entradas CC do inversor com a chave
                  seccionadora em posição ON."
                  title="Enviar vídeo testando continuidade nas entradas CC do inversor com a chave
                  seccionadora em posição ON."
                  startContent="5."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.13.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.13.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.13.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.13.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.13.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.13.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.13`}
                            code={20205}
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
            icon={<span className="">✓</span>}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none w-4 ",
              wrapper: "before:!border-gray-300",
            }}
          >
            <strong>Inversor não liga</strong>
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>NAO LIGA<<<<<<<<<<<<<<< */}

      {/* >>>>>>>>>>SEM COMUNICAÇAO<<<<<<<<<<<<<<< */}
      {handleIsSelected("noCommunication") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Inversor sem comunicação"
            title={
              <h4 className="mt-3">
                <Checkbox
                  size="lg"
                  isSelected={handleIsSelected("noCommunication")}
                  onValueChange={handleSetIsSelected("noCommunication")}
                  icon={<span className="">✓</span>}
                  color="default"
                  className="data-[selected=true]:[--nextui-default:white] me-5"
                  classNames={{
                    icon: "leading-none w-4 ",
                    wrapper: "before:!border-gray-300",
                  }}
                >
                  <strong>Inversor sem comunicação</strong>
                </Checkbox>
              </h4>
            }
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Enviar vídeo mostrando os leds do datalogger."
                  title="Enviar vídeo mostrando os leds do datalogger."
                  startContent="1."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.14.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.14.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.14.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.14.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.14.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.14.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.14`}
                            code={20301}
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
                  aria-label="Enviar foto dos parâmetros de comunicação."
                  title="Enviar foto dos parâmetros de comunicação."
                  startContent="2."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.15.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.15.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.15.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.15.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.15.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.15.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.15`}
                            code={20302}
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
            isSelected={handleIsSelected("noCommunication")}
            onValueChange={handleSetIsSelected("noCommunication")}
            icon={<span className="">✓</span>}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none w-4 ",
              wrapper: "before:!border-gray-300",
            }}
          >
            <strong>Inversor sem comunicação</strong>
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>SEM COMUNICAÇAO<<<<<<<<<<<<<<< */}

      {/* >>>>>>>>>>DANOS FISICOS<<<<<<<<<<<<<<< */}

      {handleIsSelected("physicalDmg") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Danos físicos"
            title={
              <h4 className="mt-3">
                <Checkbox
                  size="lg"
                  isSelected={handleIsSelected("physicalDmg")}
                  onValueChange={handleSetIsSelected("physicalDmg")}
                  icon={<span className="">✓</span>}
                  color="default"
                  className="data-[selected=true]:[--nextui-default:white] me-5"
                  classNames={{
                    icon: "leading-none w-4 ",
                    wrapper: "before:!border-gray-300",
                  }}
                >
                  <strong>Danos físicos</strong>
                </Checkbox>
              </h4>
            }
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Enviar foto do dano."
                  title="Enviar foto do dano."
                  startContent="1."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.16.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.16.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.16.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.16.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.16.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.16.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.16`}
                            code={20401}
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
            isSelected={handleIsSelected("physicalDmg")}
            onValueChange={handleSetIsSelected("physicalDmg")}
            icon={<span className="">✓</span>}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none w-4 ",
              wrapper: "before:!border-gray-300",
            }}
          >
            <strong>Danos físicos</strong>
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>DANOS FISICOS<<<<<<<<<<<<<<< */}

      {/* >>>>>>>>>>F 14<<<<<<<<<<<<<<< */}

      {handleIsSelected("f14") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Erro F14"
            title={
              <h4 className="mt-3">
                <Checkbox
                  size="lg"
                  isSelected={handleIsSelected("f14")}
                  onValueChange={handleSetIsSelected("f14")}
                  icon={<span className="">✓</span>}
                  color="default"
                  className="data-[selected=true]:[--nextui-default:white] me-5"
                  classNames={{
                    icon: "leading-none w-4 ",
                    wrapper: "before:!border-gray-300",
                  }}
                >
                  <strong>Erro F14</strong>
                </Checkbox>
              </h4>
            }
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando
                  bem as ponteiras e visor do multímetro."
                  title="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando
                  bem as ponteiras e visor do multímetro."
                  startContent="1."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.17.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.17.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.17.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.17.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.17.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.17.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.17`}
                            code={20501}
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
                  aria-label="Enviar foto da parte inferior do inversor mostrando as MPPTs."
                  title="Enviar foto da parte inferior do inversor mostrando as MPPTs."
                  startContent="2."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.18.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.18.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.18.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.18.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.18.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.18.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.18`}
                            code={20502}
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
                  aria-label="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, positivo +
                  terra (carcaçado inversor) e negativo + terra (carcaça do inversor), até
                  estabilizar a tensão no multímetro."
                  title="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, positivo +
                  terra (carcaçado inversor) e negativo + terra (carcaça do inversor), até
                  estabilizar a tensão no multímetro."
                  startContent="3."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.19.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.19.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.19.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.19.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.19.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.19.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.19`}
                            code={20503}
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
                  aria-label="Enviar vídeo testando continuidade nas entradas CC do inversor com a
                  chave seccionadora em posição ON."
                  title="Enviar vídeo testando continuidade nas entradas CC do inversor com a
                  chave seccionadora em posição ON."
                  startContent="4."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.20.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.20.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.20.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.20.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.20.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.20.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.20`}
                            code={20504}
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
            isSelected={handleIsSelected("f14")}
            onValueChange={handleSetIsSelected("f14")}
            icon={<span className="">✓</span>}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none w-4 ",
              wrapper: "before:!border-gray-300",
            }}
          >
            <strong>Erro F14</strong>
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>F 14<<<<<<<<<<<<<<< */}

      {/* >>>>>>>>>>F 19<<<<<<<<<<<<<<< */}

      {handleIsSelected("f19") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Erro F19"
            title={
              <h4 className="mt-3">
                <Checkbox
                  size="lg"
                  isSelected={handleIsSelected("f19")}
                  onValueChange={handleSetIsSelected("f19")}
                  icon={<span className="">✓</span>}
                  color="default"
                  className="data-[selected=true]:[--nextui-default:white] me-5"
                  classNames={{
                    icon: "leading-none w-4 ",
                    wrapper: "before:!border-gray-300",
                  }}
                >
                  <strong>Erro F19</strong>
                </Checkbox>
              </h4>
            }
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem
                  as ponteiras e visor do multímetro."
                  title="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem
                  as ponteiras e visor do multímetro."
                  startContent="1."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.21.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.21.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.21.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.21.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.21.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.21.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.21`}
                            code={20601}
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
                  aria-label="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e
                  neutro + terra."
                  title="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e
                  neutro + terra."
                  startContent="2."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.22.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.22.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.22.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.22.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.22.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.22.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.22`}
                            code={20602}
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
            isSelected={handleIsSelected("f19")}
            onValueChange={handleSetIsSelected("f19")}
            icon={<span className="">✓</span>}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none w-4 ",
              wrapper: "before:!border-gray-300",
            }}
          >
            <strong>Erro F19</strong>
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>F 19<<<<<<<<<<<<<<< */}

      {/* >>>>>>>>>>F 23/ F 24<<<<<<<<<<<<<<< */}

      {handleIsSelected("f23") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Erro F23/F24"
            title={
              <h4 className="mt-3">
                <Checkbox
                  size="lg"
                  isSelected={handleIsSelected("f23")}
                  onValueChange={handleSetIsSelected("f23")}
                  icon={<span className="">✓</span>}
                  color="default"
                  className="data-[selected=true]:[--nextui-default:white] me-5"
                  classNames={{
                    icon: "leading-none w-4 ",
                    wrapper: "before:!border-gray-300",
                  }}
                >
                  <strong>Erro F23/F24</strong>
                </Checkbox>
              </h4>
            }
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem
                  as ponteiras e visor do multímetro."
                  title="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem
                  as ponteiras e visor do multímetro."
                  startContent="1."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.23.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.23.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.23.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.23.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.23.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.23.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.23`}
                            code={20701}
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
                  aria-label="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e
                  neutro + terra."
                  title="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e
                  neutro + terra."
                  startContent="2."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.24.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.24.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.24.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.24.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.24.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.24.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.24`}
                            code={20702}
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
                  aria-label="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, positivo + terra
                  (carcaçado inversor) e negativo + terra (carcaça do inversor), até estabilizar a
                  tensão no multímetro."
                  title="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, positivo + terra
                  (carcaçado inversor) e negativo + terra (carcaça do inversor), até estabilizar a
                  tensão no multímetro."
                  startContent="3."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.25.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.25.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.25.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.25.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.25.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.25.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.25`}
                            code={20703}
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
            isSelected={handleIsSelected("f23")}
            onValueChange={handleSetIsSelected("f23")}
            icon={<span className="">✓</span>}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none w-4 ",
              wrapper: "before:!border-gray-300",
            }}
          >
            <strong>Erro F23/F24</strong>
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>F 23/ F 24<<<<<<<<<<<<<<< */}

      {/* >>>>>>>>>>F 30<<<<<<<<<<<<<<< */}

      {handleIsSelected("f30") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Erro F30"
            title={
              <h4 className="mt-3">
                <Checkbox
                  size="lg"
                  isSelected={handleIsSelected("f30")}
                  onValueChange={handleSetIsSelected("f30")}
                  icon={<span className="">✓</span>}
                  color="default"
                  className="data-[selected=true]:[--nextui-default:white] me-5"
                  classNames={{
                    icon: "leading-none w-4 ",
                    wrapper: "before:!border-gray-300",
                  }}
                >
                  <strong>Erro F30</strong>
                </Checkbox>
              </h4>
            }
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem
                  as ponteiras e visor do multímetro."
                  title="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem
                  as ponteiras e visor do multímetro."
                  startContent="1."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.26.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.26.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.26.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.26.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.26.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.26.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.26`}
                            code={20801}
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
                  aria-label="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e
                  neutro + terra."
                  title="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e
                  neutro + terra."
                  startContent="2."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.27.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.27.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.27.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.27.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.27.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.27.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.27`}
                            code={20802}
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
            isSelected={handleIsSelected("f30")}
            onValueChange={handleSetIsSelected("f30")}
            icon={<span className="">✓</span>}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none w-4 ",
              wrapper: "before:!border-gray-300",
            }}
          >
            <strong>Erro F30</strong>
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>F 30<<<<<<<<<<<<<<< */}

      {/* >>>>>>>>>>F 35/F41...<<<<<<<<<<<<<<< */}

      {handleIsSelected("f35") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Erro F35/F41/F42/F43/F44/F45/F46"
            title={
              <h4 className="mt-3">
                <Checkbox
                  size="lg"
                  isSelected={handleIsSelected("f35")}
                  onValueChange={handleSetIsSelected("f35")}
                  icon={<span className="">✓</span>}
                  color="default"
                  className="data-[selected=true]:[--nextui-default:white] me-5"
                  classNames={{
                    icon: "leading-none w-4 ",
                    wrapper: "before:!border-gray-300",
                  }}
                >
                  <strong>Erro F35/F41/F42/F43/F44/F45/F46</strong>
                </Checkbox>
              </h4>
            }
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e
                  neutro + terra."
                  title="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e
                  neutro + terra."
                  startContent="1."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.28.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.28.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.28.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.28.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.28.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.28.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.28`}
                            code={20901}
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
                  aria-label="Enviar vídeo testando continuidade nos bornes CA do inversor."
                  title="Enviar vídeo testando continuidade nos bornes CA do inversor."
                  startContent="2."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.29.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.29.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.29.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.29.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.29.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.29.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.29`}
                            code={20902}
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
                  aria-label="Enviar foto dos parâmetros de proteção na tela do inversor ou no SOLARMAN."
                  title="Enviar foto dos parâmetros de proteção na tela do inversor ou no SOLARMAN."
                  startContent="3."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.30.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.30.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.30.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.30.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.30.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.30.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.30`}
                            code={20903}
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
            isSelected={handleIsSelected("f35")}
            onValueChange={handleSetIsSelected("f35")}
            icon={<span className="">✓</span>}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none w-4 ",
              wrapper: "before:!border-gray-300",
            }}
          >
            <strong>Erro F35/F41/F42/F43/F44/F45/F46</strong>
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>F 35/F41...<<<<<<<<<<<<<<< */}

      {/* >>>>>>>>>>F55/F56...<<<<<<<<<<<<<<< */}

      {handleIsSelected("f55") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Erro F55/F56"
            title={
              <h4 className="mt-3">
                <Checkbox
                  size="lg"
                  isSelected={handleIsSelected("f55")}
                  onValueChange={handleSetIsSelected("f55")}
                  icon={<span className="">✓</span>}
                  color="default"
                  className="data-[selected=true]:[--nextui-default:white] me-5"
                  classNames={{
                    icon: "leading-none w-4 ",
                    wrapper: "before:!border-gray-300",
                  }}
                >
                  <strong>Erro F55/F56</strong>
                </Checkbox>
              </h4>
            }
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as
                  ponteiras e visor do multímetro."
                  title="Vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as
                  ponteiras e visor do multímetro."
                  startContent="1."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.31.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.31.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.31.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.31.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.31.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.31.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.31`}
                            code={21001}
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
                  aria-label="Vídeo medindo tensão CC na ponta de todos os MC4s, positivo + terra
(carcaça do inversor) e negativo + terra (carcaça do inversor), até
estabilizar a tensão no multímetro."
                  title="Vídeo medindo tensão CC na ponta de todos os MC4s, positivo + terra
(carcaça do inversor) e negativo + terra (carcaça do inversor), até
estabilizar a tensão no multímetro."
                  startContent="2."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.32.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.32.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.32.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.32.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.32.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.32.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.32`}
                            code={21002}
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
                  aria-label="Testar continuidade nas entradas CC do inversor com a chave
                  seccionadora em posição ON."
                  title="Testar continuidade nas entradas CC do inversor com a chave
                  seccionadora em posição ON."
                  startContent="3."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.33.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.33.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.33.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.33.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.33.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.33.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.33`}
                            code={21003}
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
            isSelected={handleIsSelected("f55")}
            onValueChange={handleSetIsSelected("f55")}
            icon={<span className="">✓</span>}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none w-4 ",
              wrapper: "before:!border-gray-300",
            }}
          >
            <strong>Erro F55/F56</strong>
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>F55/F56...<<<<<<<<<<<<<<< */}

      {/* >>>>>>>>>>F64...<<<<<<<<<<<<<<< */}

      {handleIsSelected("f64") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Erro F64"
            title={
              <h4 className="mt-3">
                <Checkbox
                  size="lg"
                  isSelected={handleIsSelected("f64")}
                  onValueChange={handleSetIsSelected("f64")}
                  icon={<span className="">✓</span>}
                  color="default"
                  className="data-[selected=true]:[--nextui-default:white] me-5"
                  classNames={{
                    icon: "leading-none w-4 ",
                    wrapper: "before:!border-gray-300",
                  }}
                >
                  <strong>Erro F64</strong>
                </Checkbox>
              </h4>
            }
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as
                  ponteiras e visor do multímetro."
                  title="Vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as
                  ponteiras e visor do multímetro."
                  startContent="1."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.34.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.34.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.34.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.34.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.34.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.34.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.34`}
                            code={21101}
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
                  aria-label="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e
                  neutro + terra."
                  title="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e
                  neutro + terra."
                  startContent="2."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.35.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.35.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.35.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.35.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.35.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.35.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.35`}
                            code={21102}
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
            isSelected={handleIsSelected("f64")}
            onValueChange={handleSetIsSelected("f64")}
            icon={<span className="">✓</span>}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none w-4 ",
              wrapper: "before:!border-gray-300",
            }}
          >
            <strong>Erro F64</strong>
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>F64...<<<<<<<<<<<<<<< */}

      {/* >>>>>>>>>>STANDYBY<<<<<<<<<<<<<<< */}

      {handleIsSelected("standby") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="STANDBY/SELFCHECK"
            title={
              <h4 className="mt-3">
                <Checkbox
                  size="lg"
                  isSelected={handleIsSelected("standby")}
                  onValueChange={handleSetIsSelected("standby")}
                  icon={<span className="">✓</span>}
                  color="default"
                  className="data-[selected=true]:[--nextui-default:white] me-5"
                  classNames={{
                    icon: "leading-none w-4 ",
                    wrapper: "before:!border-gray-300",
                  }}
                >
                  <strong>STANDBY/SELFCHECK</strong>
                </Checkbox>
              </h4>
            }
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra."
                  title="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra."
                  startContent="1."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.36.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.36.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.36.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.36.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.36.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.36.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.36`}
                            code={21201}
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
                  aria-label="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as ponteiras e visor do multímetro."
                  title="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as ponteiras e visor do multímetro."
                  startContent="2."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.37.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.37.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.37.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.37.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.37.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.37.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.37`}
                            code={21202}
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
            isSelected={handleIsSelected("standby")}
            onValueChange={handleSetIsSelected("standby")}
            icon={<span className="">✓</span>}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none w-4 ",
              wrapper: "before:!border-gray-300",
            }}
          >
            <strong>STANDBY/SELFCHECK</strong>
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>STANDYBY<<<<<<<<<<<<<<< */}

      {/* >>>>>>>>>>NOISE<<<<<<<<<<<<<<< */}

      {handleIsSelected("noise") ? (
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Ruído"
            title={
              <h4 className="mt-3">
                <Checkbox
                  size="lg"
                  isSelected={handleIsSelected("noise")}
                  onValueChange={handleSetIsSelected("noise")}
                  icon={<span className="">✓</span>}
                  color="default"
                  className="data-[selected=true]:[--nextui-default:white] me-5"
                  classNames={{
                    icon: "leading-none w-4 ",
                    wrapper: "before:!border-gray-300",
                  }}
                >
                  <strong>Ruído</strong>
                </Checkbox>
              </h4>
            }
          >
            <div className="flex flex-col gap-2 p-5">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem
                  as ponteiras e visor do multímetro."
                  title="Vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as
                  ponteiras e visor do multímetro."
                  startContent="1."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.38.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.38.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.38.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.38.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.38.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.38.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.38`}
                            code={21301}
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
                  aria-label="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e
                  neutro + terra."
                  title="Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e
                  neutro + terra."
                  startContent="2."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.39.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.39.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.39.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.39.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.39.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.39.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.39`}
                            code={21302}
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
                  aria-label="Enviar vídeo do ruído que está apresentando."
                  title="Enviar vídeo do ruído que está apresentando."
                  startContent="3."
                  subtitle={`${
                    formStep3.getFieldState(
                      `products.${indexId}.stringFiles.40.content`
                    ).error
                      ? "Por favor preencha esse campo corretamente."
                      : ""
                  }`}
                  className={`${
                    formStep3.getFieldState(`products.${indexId}.stringFiles.40.content`)
                      .error
                      ? "px-1 border-red-500 border-2 rounded-lg"
                      : ""
                  }`}
                  classNames={{
                    startContent: "min-w-[50px] max-w-[50px]",
                    title: `${
                      formStep3.getFieldState(
                        `products.${indexId}.stringFiles.40.content`
                      ).error
                        ? "after:content-['_*'] after:text-red-500"
                        : ""
                    }${
                      formStep3.watch(
                        `products.${indexId}.stringFiles.40.content`
                      ) &&
                      !formStep3.getFieldState(
                        `products.${indexId}.stringFiles.40.content`
                      ).error
                        ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                        : ""
                    }
                    `,
                    subtitle: "text-red-500",
                  }}
                >
                  <FormField
                    control={formStep3.control}
                    name={`products.${indexId}.stringFiles.40.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                          formStep3={formStep3}
                            type={["pdf", "image", "audio"]}
                            onFormsChange={field.onChange}
                            id={`products.${indexId}.stringFiles.40`}
                            code={21303}
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
            isSelected={handleIsSelected("noise")}
            onValueChange={handleSetIsSelected("noise")}
            icon={<span className="">✓</span>}
            color="default"
            className="data-[selected=true]:[--nextui-default:white]"
            classNames={{
              icon: "leading-none w-4 ",
              wrapper: "before:!border-gray-300",
            }}
          >
            <strong>Ruído</strong>
          </Checkbox>
        </h4>
      )}
      {/* >>>>>>>>>>NOISE<<<<<<<<<<<<<<< */}
    </>
  );
}

export default StringTests;

import { Accordion, AccordionItem, Input } from "@nextui-org/react";
import React, { useMemo } from "react";
import UploadInput from "./UploadInput";
import { MicroSelected } from "./Step3";
import { UseFormReturn } from "react-hook-form";
import { FormStep3Type } from "./useFormStep3";
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

function HybridTests({ isSelected, setIsSelected, id, formStep3 }: Props) {
  const indexId = useMemo(() => id - 1, []);
  return (
    <>
      <h4 className="text-center">
        Documentações para entrada de análise de garantia (Inversores Híbridos)
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
          startContent="1."
          aria-label="Nota fiscal de compra."
          title="Nota fiscal de compra."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.0.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.0.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.0.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.0.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.0.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <div className="flex flex-col gap-2 p-5">
            <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.0.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                      type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.0`}
                      formStep3={formStep3}
                      code={30101}
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
            formStep3.getFieldState(`products.${indexId}.hybridFiles.1.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.1.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.1.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.1.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.1.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.1.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                      type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.1`}
                      formStep3={formStep3}
                      code={30102}
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
            formStep3.getFieldState(`products.${indexId}.hybridFiles.2.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.2.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.2.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.2.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.2.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.2.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                      type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.2`}
                      formStep3={formStep3}
                      code={30103}
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
          aria-label="Datasheet das baterias."
          title="Datasheet das baterias."
          startContent="4."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.3.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.3.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.3.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.3.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.3.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.3.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                      type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.3`}
                      formStep3={formStep3}
                      code={30104}
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
          aria-label="Foto da etiqueta lateral do inversor com número de série."
          title="Foto da etiqueta lateral do inversor com número de série."
          startContent="5."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.4.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.4.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.4.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.4.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.4.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.4.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                      type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.4`}
                      formStep3={formStep3}
                      code={30105}
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
          aria-label="Vídeo amplo do local de instalação do inversor mostrando o número de série do inversor."
          title="Vídeo amplo do local de instalação do inversor mostrando o número de série do inversor."
          startContent="6."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.5.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.5.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.5.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.5.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.5.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.5.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                      type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.5`}
                      formStep3={formStep3}
                      code={30106}
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
          aria-label="Vídeo amplo do local de instalação dos módulos fotovoltaicos."
          title="Vídeo amplo do local de instalação dos módulos fotovoltaicos."
          startContent="7."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.6.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.6.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.6.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.6.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.6.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.6.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                      type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.6`}
                      formStep3={formStep3}
                      code={30107}
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
          aria-label="Foto da stringbox CC aberta (se existir)."
          title="Foto da stringbox CC aberta (se existir)."
          startContent="8."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.7.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.7.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.7.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.7.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.7.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.7.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                      type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.7`}
                      formStep3={formStep3}
                      code={30108}
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
          aria-label="Foto da stringbox CA aberta."
          title="Foto da stringbox CA aberta."
          startContent="9."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.8.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.8.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.8.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.8.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.8.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.8.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                      type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.8`}
                      formStep3={formStep3}
                      code={30109}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="10"
          aria-label="Datasheet do transformador (se existir)."
          title="Datasheet do transformador (se existir)."
          startContent="10."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.9.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.9.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.9.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.9.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.9.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.9.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                      type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.9`}
                      formStep3={formStep3}
                      code={30110}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="11"
          aria-label="Vídeo medindo tensão CA entre fases, fases+neutro, fases+terra e neutro+terra."
          title="Vídeo medindo tensão CA entre fases, fases+neutro, fases+terra e neutro+terra."
          startContent="11."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.10.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.10.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.10.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.10.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.10.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.10.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                      type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.10`}
                      formStep3={formStep3}
                      code={30111}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="12"
          aria-label="Vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as
          ponteiras e visor do multímetro."
          title="Vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as
          ponteiras e visor do multímetro."
          startContent="12."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.11.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.11.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.11.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.11.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.11.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.11.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                    formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.11`}
                      code={30112}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="13"
          aria-label="Foto da parte inferior do inversor mostrando as MPPTs."
          title="Foto da parte inferior do inversor mostrando as MPPTs."
          startContent="13."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.12.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.12.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.12.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.12.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.12.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.12.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                    formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.12`}
                      code={30113}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="14"
          aria-label="Foto das conexões frontais do inversor híbrido mostrando conexão de bateria,
          GRID, LOAD e GEN."
          title="Foto das conexões frontais do inversor híbrido mostrando conexão de bateria,
          GRID, LOAD e GEN."
          startContent="14."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.13.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.13.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.13.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.13.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.13.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.13.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                    formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.13`}
                      code={30114}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="15"
          aria-label="Vídeo medindo tensão CC na ponta de todos os MC4s, positivo+terra (carcaça
            do inversor) e negativo+terra (carcaça do inversor), até estabilizar a tensão no
            multímetro."
          title="Vídeo medindo tensão CC na ponta de todos os MC4s, positivo+terra (carcaça
            do inversor) e negativo+terra (carcaça do inversor), até estabilizar a tensão no
            multímetro."
          startContent="15."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.14.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.14.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.14.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.14.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.14.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.14.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                    formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.14`}
                      code={30115}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="16"
          aria-label="Vídeo medindo tensão das baterias."
          title="Vídeo medindo tensão das baterias."
          startContent="16."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.15.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.15.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.15.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.15.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.15.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.15.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                    formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.15`}
                      code={30116}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="17"
          aria-label="Vídeo testando continuidade nos bornes CA do inversor."
          title="Vídeo testando continuidade nos bornes CA do inversor."
          startContent="17."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.16.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.16.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.16.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.16.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.16.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.16.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                    formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.16`}
                      code={30117}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="18"
          aria-label="Vídeo testando continuidade nas entradas CC do inversor com a chave
          seccionadora em posição ON."
          title="Vídeo testando continuidade nas entradas CC do inversor com a chave
          seccionadora em posição ON."
          startContent="18."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.17.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.17.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.17.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.17.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.17.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.17.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                    formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.17`}
                      code={30118}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="19"
          aria-label="Vídeo testando continuidade entre a porta GRID e LOAD."
          title="Vídeo testando continuidade entre a porta GRID e LOAD."
          startContent="19."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.18.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.18.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.18.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.18.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.18.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.18.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                    formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.18`}
                      code={30119}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="20"
          aria-label="Vídeo testando continuidade nos terminais de conexão da bateria no inversor
          (com a bateria desligada)."
          title="Vídeo testando continuidade nos terminais de conexão da bateria no inversor
          (com a bateria desligada)."
          startContent="20."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.19.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.19.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.19.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.19.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.19.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.19.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                    formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.19`}
                      code={30120}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
        <AccordionItem
          key="21"
          aria-label="Foto da tela TEST DATA (clicar no símbolo de engrenagem, com os botões de
            cima e baixo apertados, pressionar enter)."
          title="Foto da tela TEST DATA (clicar no símbolo de engrenagem, com os botões de
            cima e baixo apertados, pressionar enter)."
          startContent="21."
          subtitle={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.20.content`)
              .error
              ? "Por favor preencha esse campo corretamente."
              : ""
          }`}
          className={`${
            formStep3.getFieldState(`products.${indexId}.hybridFiles.20.content`)
              .error
              ? "px-1 border-red-500 border-2 rounded-lg"
              : ""
          }`}
          classNames={{
            startContent: "min-w-[50px] max-w-[50px]",
            title: `${
              formStep3.getFieldState(
                `products.${indexId}.hybridFiles.20.content`
              ).error
                ? "after:content-['_*'] after:text-red-500"
                : ""
            }${
              formStep3.watch(`products.${indexId}.hybridFiles.20.content`) &&
              !formStep3.getFieldState(
                `products.${indexId}.hybridFiles.20.content`
              ).error
                ? "after:content-['_✓'] after:text-green-500 after:sm:text-2xl"
                : ""
            }`,
            subtitle: "text-red-500",
          }}
        >
          <FormField
              control={formStep3.control}
              name={`products.${indexId}.hybridFiles.20.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropzone
                    formStep3={formStep3}
                    type={["pdf", "image", "audio"]}
                      onFormsChange={field.onChange}
                      id={`products.${indexId}.hybridFiles.20`}
                      code={30121}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          {/* <Input isRequired label="Nome" placeholder="Seu nome" type="text" /> */}
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default HybridTests;

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";

import React, { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useWindowSize } from "@uidotdev/usehooks";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Backend_URL } from "@/lib/Constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  warrantyType: z.enum(["FIX", "REPLACE"], {
    required_error: `\u24D8 Por favor selecione o tipo`,
  }),
});

type Props = {
  warrantyId: number;
};

function ApproveModal({ warrantyId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      warrantyType: "FIX",
    },
  });
  const [isLoading, startTransition] = useTransition();

  const router = useRouter();

  const { update } = useSession();
  const approve = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const session = await update();

      const response = await fetch(Backend_URL + `/warranty/${warrantyId}`, {
        method: "PATCH",
        cache: "no-store",
        body: JSON.stringify(values),
        headers: {
          authorization: `Bearer ${session?.backendTokens.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const approveData = await response.json();
      console.log(approveData);
      router.refresh();
    });
  };

  const size = useWindowSize();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await approve(values);
  }
  return (
    <>
      {" "}
      <Button onPress={onOpen} color="success" variant="shadow" className="lg">
        Aprovar
      </Button>
      <Modal size="lg" className="" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Aprovar Garantia</ModalHeader>
          <ModalBody>
            {isLoading ? (
              <Spinner className="min-h-[200px]" />
            ) : (
              <>
                <Form {...form}>
                  <form
                    className="space-y-6 w-full flex flex-col items-center"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="warrantyType"
                        defaultValue="FIX"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                label="Escolha o tipo da garantia"
                                placeholder=""
                                fullWidth
                                // className="max-w-xs"
                                onBlur={onBlur}
                                onChange={onChange}
                                selectedKeys={value ? [value] : []}
                              >
                                <SelectItem key={"FIX"} value={"FIX"}>
                                  FIX
                                </SelectItem>
                                <SelectItem key={"REPLACE"} value={"REPLACE"}>
                                  REPLACE
                                </SelectItem>
                              </Select>
                            </FormControl>
                            <FormMessage className="text-white/100 text-center bg-red-500/80 rounded-lg  max-sm:text-xs max-sm:leading-none py-[2px] sm:p-1" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      className="mx-auto"
                      variant="ghost"
                      color="success"
                      type="submit"
                    >
                      Confirmar
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ApproveModal;

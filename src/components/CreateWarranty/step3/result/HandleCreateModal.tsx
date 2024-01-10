import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Image,
  Divider,
  Textarea,
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  onOpenChange: () => void;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setEdited: React.Dispatch<
    React.SetStateAction<{
      authorAddress: boolean;
      colectAddress: boolean;
      returnAddress: boolean;
    }>
  >;
};

function HandleCreateModal({
  isOpen,
  onOpenChange,
  isLoading,
  setSelected,
  setEdited,
}: Props) {
  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => {
        setEdited({
          authorAddress: false,
          colectAddress: false,
          returnAddress: false,
        });
        setSelected("step-1");
      }}
      placement="top-center"
      hideCloseButton
      isDismissable={false}
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
               {isLoading ? <h4> Gerando Garantia:</h4> : null}
            </ModalHeader>
            <ModalBody className="text-center">
              {isLoading ? <Spinner size="lg" /> : <h2>Pedido de Garantia gerado!</h2>}
            </ModalBody>

            <ModalFooter className="flex justify-center">
              {isLoading ? null : (
                <Button
                  isDisabled={isLoading}
                  color="success"
                  variant="flat"
                  onPress={onClose}
                >
                  Ok
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
      <div>HandleCreateModal</div>
    </Modal>
  );
}

export default HandleCreateModal;

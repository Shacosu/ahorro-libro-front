import { Modal, ModalContent, ModalHeader, ModalBody, Button } from "@nextui-org/react";
import { List, Sparkles } from "lucide-react";
import Link from "next/link";
import { users } from "@prisma/client";

interface ImportListModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: users;
}

export default function ImportListModal({ isOpen, onClose, user }: ImportListModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        header: "border-b-[1px] border-[#004e59]/30",
        base: "border-[#004e59]/50",
        closeButton: "hover:bg-[#004e59]/10",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-[#004e59]">
              <h2>Importar Lista</h2>
              <p className="text-xs text-default-500 font-normal opacity-70">
                Importa una lista completa de libros desde Buscalibre para rastrearlos todos a la vez
              </p>
            </ModalHeader>
            <ModalBody className="py-6">
              {user.plan === "Premium" ? (
                <form className="space-y-4">
                  <div>
                    <label htmlFor="listUrl" className="block text-sm font-medium text-[#004e59]">
                      Link de Lista
                    </label>
                    <input
                      type="url"
                      id="listUrl"
                      name="listUrl"
                      placeholder="https://www.buscalibre.cl/v2/..."
                      className="mt-1 block w-full p-3 text-base rounded-md border-[#004e59]/30 border outline-none shadow-sm focus:border-[#004e59] focus:ring-[#004e59] bg-transparent"
                      autoComplete="off"
                    />
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full bg-[#004e59] text-white h-12 text-base"
                  >
                    <List size={20} />
                    Importar Lista
                  </Button>
                </form>
              ) : (
                <div className="text-lg text-gray-500 text-center font-bold flex flex-col gap-2 items-center">
                  <span>Necesitas ser Premium para importar listas</span>
                  <Button
                    as={Link}
                    href="/#pricing"
                    color="primary"
                    className="bg-[#004e59]"
                    size="sm"
                  >
                    Ver Planes disponibles
                  </Button>
                </div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
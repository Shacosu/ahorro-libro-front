"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, Button } from "@nextui-org/react";
import { BookIcon } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface User {
  email: string;
  userId: string;
}

export default function AddBookModal({ isOpen, onClose }: AddBookModalProps) {
  const [bookUrl, setBookUrl] = useState("");
  const session = useSession() as unknown as { data: { user: User } };
  const router = useRouter();

  const addBookToLibrary = async (bookUrl: string) => {
    const isFromBuscalibre = bookUrl.includes("buscalibre.cl")
    if (!bookUrl) return toast.error("Por favor ingresa un enlace válido")
    if (!isFromBuscalibre) return toast.error("Por favor ingresa un enlace de Buscalibre")
    if (!session.data?.user?.email) return toast.error("Por favor inicia sesión para agregar libros")

    const response = await fetch(`https://ahorro-libro.onrender.com/api/v1/books/add-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: bookUrl, userId: session.data?.user?.userId })
    })

    if (response.ok) {
      router.refresh()
      toast.success("Libro agregado a tu biblioteca")
      setBookUrl("");
      onClose();
    } else {
      toast.error("Error al agregar el libro, favor de intentar nuevamente")
    }
  }

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
              <h2>Agregar Nuevo Libro</h2>
              <p className="text-xs text-default-500 font-normal opacity-70">
                Ingresa el enlace del libro de Buscalibre para comenzar a rastrear su precio
              </p>
            </ModalHeader>
            <ModalBody className="py-6">
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                addBookToLibrary(bookUrl);
              }}>
                <div>
                  <label htmlFor="bookUrl" className="block text-sm font-medium text-[#004e59]">
                    Link de Buscalibre
                  </label>
                  <input
                    type="url"
                    id="bookUrl"
                    name="bookUrl"
                    value={bookUrl}
                    onChange={(e) => setBookUrl(e.target.value)}
                    placeholder="https://www.buscalibre.cl/libro/..."
                    className="mt-1 block w-full p-3 text-base rounded-md border-[#004e59]/30 border outline-none shadow-sm focus:border-[#004e59] focus:ring-[#004e59] bg-transparent"
                    autoComplete="off"
                  />
                </div>
                <Button
                  color="primary"
                  type="submit"
                  className="w-full bg-[#004e59] text-white h-12 text-base"
                >
                  <BookIcon size={20} />
                  Agregar Libro
                </Button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
import React from 'react';
import { Button } from "@nextui-org/button";

interface AddBookFormProps {
  bookUrl: string;
  loading: boolean;
  error: string;
  setBookUrl: (url: string) => void;
  handleAddBook: (e: React.FormEvent) => void;
}

export default function AddBookForm({ bookUrl, loading, error, setBookUrl, handleAddBook }: AddBookFormProps) {
  return (
    <div className="mb-8 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Agregar Nuevo Libro</h2>
      <form onSubmit={handleAddBook} className="space-y-4">
        <div>
          <label htmlFor="bookUrl" className="block text-sm font-medium text-gray-700">
            URL del libro en Buscalibre.cl
          </label>
          <input
            type="url"
            id="bookUrl"
            value={bookUrl}
            onChange={(e) => setBookUrl(e.target.value)}
            placeholder="https://www.buscalibre.cl/libro/..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004e59] focus:ring-[#004e59]"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          type="submit"
          className="bg-[#004e59] text-white"
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Agregar Libro'}
        </Button>
      </form>
    </div>
  );
}
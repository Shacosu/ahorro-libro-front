"use client"

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { ArrowUpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#004e59] text-white py-12 relative">
      <AnimatePresence>
        {showButton && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-white text-[#004e59] p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            aria-label="Volver arriba"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ahorro Libro</h3>
            <p className="text-sm">
              Tu plataforma de confianza para encontrar los mejores precios en libros.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-yellow-300 transition-colors">Inicio</Link></li>
              <li><Link href="/nosotros" className="hover:text-yellow-300 transition-colors">Nosotros</Link></li>
              <li><Link href="/precios" className="hover:text-yellow-300 transition-colors">Precios</Link></li>
              <li><Link href="/contacto" className="hover:text-yellow-300 transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacidad" className="hover:text-yellow-300 transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/terminos" className="hover:text-yellow-300 transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="/cookies" className="hover:text-yellow-300 transition-colors">Política de Cookies</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li>Email: contacto@ahorrolibro.cl</li>
              <li>Tel: +56 9 4701 5035</li>
              <li>Chile, Santiago</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Ahorro Libro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
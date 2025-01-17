"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/button';
import Link from "next/link";

const Banner = () => {
  return (
    <motion.section
      className="relative bg-cover bg-center h-[80vh] flex items-center justify-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544822688-c5f41d2c1972?q=80&w=2019&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-[#004e59] opacity-35"></div>
      <div className="container mx-auto text-center relative z-10 py-20 flex flex-col items-center justify-center" style={{ filter: 'none' }}>
        <motion.h1
          className="text-5xl font-bold text-white shadow-lg mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Conoce el universo mágico de Ahorro Libro
        </motion.h1>
        <motion.p
          className="mt-2 text-2xl text-gray-200 max-w-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Monitorea precios y disponibilidad de libros fácilmente.
        </motion.p>
        <motion.div
          className="flex items-center space-x-4 mt-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <div>
            <Link href="/#pricing" className="bg-[#004e59] hover:bg-[#003840] text-white p-4 px-6 rounded-lg shadow-lg border-2 border-white">
              Comienza Ahora
            </Link>
          </div>

          <div>
            <Link href="#features" className="bg-white text-[#004e59] hover:bg-gray-100 p-4 px-6 rounded-lg shadow-lg border-2 border-[#004e59]">
              Más Información
            </Link>
          </div>

        </motion.div>
      </div>
    </motion.section>
  );
};

export default Banner;
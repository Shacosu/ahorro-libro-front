"use client"
import React from 'react';
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section className="py-20 bg-gray-100 scroll-m-44" id="features">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-[#004e59] mb-4">Funcionalidades Principales</h2>
          <p className="text-xl text-gray-600">Descubre todo lo que puedes hacer con Ahorro Libro</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 hover:shadow-xl transition-shadow duration-300 h-full">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <svg className="w-12 h-12 text-[#004e59] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="font-bold text-2xl text-[#004e59]">Seguimiento de Precios</h3>
              </CardHeader>
              <CardBody className="py-4">
                <p className="text-gray-600">Monitorea los precios de tus libros favoritos en tiempo real y recibe notificaciones cuando bajen de precio.</p>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 hover:shadow-xl transition-shadow duration-300 h-full">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <svg className="w-12 h-12 text-[#004e59] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <h3 className="font-bold text-2xl text-[#004e59]">Alertas Personalizadas</h3>
              </CardHeader>
              <CardBody className="py-4">
                <p className="text-gray-600">Configura alertas personalizadas para recibir notificaciones cuando los libros alcancen tu precio objetivo.</p>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="p-6 hover:shadow-xl transition-shadow duration-300 h-full">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <svg className="w-12 h-12 text-[#004e59] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="font-bold text-2xl text-[#004e59]">Comparador de Precios</h3>
              </CardHeader>
              <CardBody className="py-4">
                <p className="text-gray-600">Compara precios entre diferentes tiendas y encuentra las mejores ofertas disponibles en el mercado.</p>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
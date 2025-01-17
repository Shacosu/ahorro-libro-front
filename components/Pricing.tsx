"use client"

import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from '@nextui-org/button';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import UpgradeBtn from "./UpgradeBtn";
import { CheckIcon } from 'lucide-react';
import Link from 'next/link';

const Pricing = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = (plan: string) => {
    if (!session) {
      router.push('/login');
      return;
    }

    switch (plan) {
      case 'basic':
        // Handle basic plan
        break;
      case 'premium':
        // Handle premium subscription
        break;
      case 'enterprise':
        // Handle enterprise contact
        break;
    }
  };

  return (
    <section className="py-20 bg-white scroll-m-28" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-[#004e59] mb-4">Planes diseñados para ti</h2>
          <p className="text-xl text-gray-600">Elige el plan que mejor se adapte a tus necesidades</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Plan Básico */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full"
          >
            <Card className="p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h3 className="font-bold text-2xl text-[#004e59]">Básico</h3>
                <p className="text-5xl font-bold text-[#004e59] my-4">Gratis</p>
              </CardHeader>
              <CardBody className="py-4 flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-yellow-500 mr-2" />
                    Monitoreo de 3 libros
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-yellow-500 mr-2" />
                    Frecuencia de rastreo (Cada 3 horas)
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-yellow-500 mr-2" />
                    Alertas por email
                  </li>
                </ul>
              </CardBody>
              <CardFooter>
                <Button className="w-full bg-[#004e59] text-white" as={Link} href="/login">Comenzar</Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Plan Premium */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-full"
          >
            <Card className="p-6 border-2 border-yellow-500 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h3 className="font-bold text-2xl text-[#004e59]">Premium</h3>
                <p className="text-5xl font-bold text-[#004e59] my-4">$7.990<span className="text-lg">/mes</span></p>
              </CardHeader>
              <CardBody className="py-4 flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-yellow-500 mr-2" />
                    Monitoreo ilimitado de libros
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-yellow-500 mr-2" />
                    Importación de listas
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-yellow-500 mr-2" />
                    Frecuencia de rastreo (Cada 15 minutos)
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-yellow-500 mr-2" />
                    Análisis de precios
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-yellow-500 mr-2" />
                    Alertas por email (Whatsapp y Telegram proximamente)
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-yellow-500 mr-2" />
                    Manejo de porcentajes de descuento en alertas
                  </li>
                </ul>
              </CardBody>
              <CardFooter>
                <UpgradeBtn />
              </CardFooter>
            </Card>
          </motion.div>

          {/* Plan Empresarial */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="h-full"
          >
            <Card className="p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h3 className="font-bold text-2xl text-[#004e59]">Empresarial</h3>
                <p className="text-5xl font-bold text-[#004e59] my-4">$24.990<span className="text-lg">/mes</span></p>
              </CardHeader>
              <CardBody className="py-4 flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-yellow-500 mr-2" />
                    Todo lo incluido en Premium
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-yellow-500 mr-2" />
                    API acceso
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-yellow-500 mr-2" />
                    Soporte prioritario
                  </li>
                </ul>
              </CardBody>
              <CardFooter>
                <Button className="w-full bg-[#004e59] text-white" as={Link} href="#" disabled>Proximamente</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
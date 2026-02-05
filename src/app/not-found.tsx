"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-64px-200px)] items-center bg-gradient-to-b from-primary-50 via-white to-white py-16 sm:py-24">
      <Container className="text-center">
        {/* Animated illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-8 flex h-48 w-48 items-center justify-center sm:h-64 sm:w-64"
        >
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
          >
            {/* Background circle with gradient */}
            <motion.circle
              cx="100"
              cy="100"
              r="90"
              fill="url(#gradient404)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />

            {/* Magnifying glass body */}
            <motion.circle
              cx="85"
              cy="85"
              r="45"
              stroke="#4f46e5"
              strokeWidth="8"
              fill="white"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Magnifying glass handle */}
            <motion.line
              x1="118"
              y1="118"
              x2="155"
              y2="155"
              stroke="#4f46e5"
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />

            {/* Question mark inside magnifying glass */}
            <motion.text
              x="85"
              y="100"
              textAnchor="middle"
              fontSize="48"
              fontWeight="bold"
              fill="#6366f1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              ?
            </motion.text>

            {/* Floating particles */}
            <motion.circle
              cx="45"
              cy="50"
              r="4"
              fill="#a5b4fc"
              animate={{
                y: [0, -8, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="150"
              cy="70"
              r="3"
              fill="#10b981"
              animate={{
                y: [0, -6, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <motion.circle
              cx="160"
              cy="130"
              r="5"
              fill="#c7d2fe"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient
                id="gradient404"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#eef2ff" />
                <stop offset="100%" stopColor="#e0e7ff" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* 404 number */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-6xl font-extrabold text-primary-200 sm:text-8xl"
        >
          404
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl"
        >
          Ups, esta pagina no existe
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mt-4 max-w-md text-lg text-slate-500"
        >
          Puede que el enlace este roto o la pagina haya sido movida.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-md shadow-primary-500/20 transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30 active:scale-95"
          >
            Volver al inicio
          </Link>
          <Link
            href="/precios"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-base font-medium text-slate-600 transition-all hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600"
          >
            Ver precios
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

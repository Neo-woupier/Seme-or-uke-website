// app/template.tsx
"use client"; // เช็กสะกดให้ถูก และห้ามมีเว้นวรรคในเครื่องหมายคำพูดนะครับ

import { motion } from "framer-motion";

// template ต้องรับ children มาแสดงผลเสมอครับ
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex-grow flex flex-col"
    >
      {/* คำว่า {children} คือส่วนที่สำคัญที่สุด 
         มันคือการบอกว่า "เอาเนื้อหาของแต่ละหน้า (หน้าแรก หรือ หน้า Quiz) มาวางตรงนี้"
      */}
      {children}
    </motion.div>
  );
}
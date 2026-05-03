"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// 1. เก็บตัวเลือกและคะแนนไว้ใน Array เหมือนเดิม (เพื่อความง่ายในการสุ่ม)
const initialOptions = [
  { text: "ปล่อยจอย ไม่อยากแข่งด้วย สนใจสิ่งที่ทำตรงหน้า", points: 1 },
  { text: "ประหม่าหน่อยๆ แต่ก็รอดูสถานการณ์ไปก่อนละกัน", points: 2 },
  { text: "วิเคราะห์ด้วยเหตุผลว่าสู้ไปแล้วคุ้มไหม", points: 3 },
  { text: "อยากแข่งหรอ? เอาดิได้หมด แต่อย่าแพ้ละกัน!", points: 4 },
  { text: "รับคำท้าสิครับ รออะไร สู้ได้อยู่แล้ว!", points: 5 },
];

export default function Question1() {
  const router = useRouter();
  const [options, setOptions] = useState<{text: string, points: number}[]>([]);

  // 2. ใช้ useEffect เพื่อสุ่มลำดับ (Shuffle) เหมือนเดิม
  useEffect(() => {
    const shuffled = [...initialOptions].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
  }, []);

  const handleAnswer = (points: number) => {
    // เอาคะแนนแปะท้าย URL ส่งไปหน้า q2
    router.push(`/quiz/q2?score=${points}`);
  };

  if (options.length === 0) return null;

  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4 md:py-8 md:px-24 w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-pink-700 bg-white/80 px-6 py-2 rounded-3xl mb-6 text-center shadow-sm w-full max-w-2xl leading-relaxed">
        1. เวลาทำอะไรสักอย่างอยู่ แล้วมีคนมาแข่งด้วย สไตล์ของคุณคือ...
      </h1>

      {/* --- ส่วนที่แก้ไข Layout (Grid) --- */}
      {/* เปลี่ยนจาก flex-col เป็น grid และกำหนดให้มี 2 คอลัมน์ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full max-w-2xl">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleAnswer(option.points)}
            // เพิ่ม dynamic className สำหรับปุ่มที่ 5 (index 4)
            // และเปลี่ยน text-left เป็น text-center ทั้งหมดเพื่อให้ Grid ดูดีขึ้น
            className={`bg-white/95 text-pink-700 font-bold py-4 px-6 rounded-2xl shadow-md border-2 border-pink-200 hover:bg-pink-200 transition-colors text-center ${
              index === 4 ? "md:col-span-2 mx-auto w-full md:w-2/3" : "" // ปุ่มสุดท้าย Span 2 และจัดกลาง ขนาดพอดี
            }`}
          >
            {option.text}
          </motion.button>
        ))}
      </div>
    </main>
  );
}
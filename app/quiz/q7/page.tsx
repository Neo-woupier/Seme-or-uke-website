"use client";

import { Suspense } from 'react';
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// 1. ตัวเลือกข้อ 7 ข้อสุดท้าย!
const initialOptions = [
  { text: "นั่งกินเงียบๆ เขี่ยๆ เอา ไม่ชอบก็ไม่กิน (•ㅅ•)", points: 1 },
  { text: "บ่นนิดหน่อย \" ทำไมสั่งอันนี้อ่า \" แต่สุดท้ายก็กิน อยู่ดี ( ￣ー￣)💨", points: 2 },
  { text: "กินเท่าที่กินได้ ที่เหลือก็ปล่อยไว้งั้นแหละ (눈_눈)", points: 3 },
  { text: "เรียกพนักงานมา แล้วสั่งเมนูที่ตัวเองอยากกินเพิ่มแยกต่างหาก (≖_≖ )", points: 4 },
  { text: "โวยเลย \"สั่งอะไรมาเนี่ย!\" แล้วจัดการสั่งเซ็ตใหม่มาคุมโต๊ะเอง (ﾟДﾟ)", points: 5 },
];

function QuizContent7() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentScore = parseInt(searchParams.get("score") || "0");

  const [options, setOptions] = useState<{text: string, points: number}[]>([]);

  useEffect(() => {
    const shuffled = [...initialOptions].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
  }, []);

  const handleAnswer = (points: number) => {
    const totalScore = currentScore + points;
    // ส่งต่อไปหน้า q8 (หน้าสรุปผลที่ Bro รอคอย!)
    router.push(`/quiz/q8?score=${totalScore}`);
  };

  if (options.length === 0) return null;

  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4 md:py-8 md:px-24 w-full">
      
      <div className="absolute top-4 right-4 bg-white/50 px-4 py-2 rounded-full text-pink-500 font-bold text-sm">
        คะแนนสะสม: {currentScore}
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-pink-700 bg-white/80 px-6 py-2 rounded-3xl mb-6 text-center shadow-sm w-full max-w-2xl leading-relaxed">
        7. ไปกินข้าวกับเพื่อน แต่เพื่อนดันสั่งแต่ "ของที่คุณไม่ชอบกิน" มาเต็มโต๊ะเลย?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full max-w-2xl">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleAnswer(option.points)}
            className={`bg-white/95 text-pink-700 font-bold py-4 px-6 rounded-2xl shadow-md border-2 border-pink-200 hover:bg-pink-200 transition-colors text-center ${
              index === 4 ? "md:col-span-2 mx-auto w-full md:w-2/3" : "" 
            }`}
          >
            {option.text}
          </motion.button>
        ))}
      </div>
    </main>
  );
}
export default function Question7() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <QuizContent7/>
    </Suspense>
  );
}
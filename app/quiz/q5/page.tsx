"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// 1. ตัวเลือกข้อ 5 พร้อมอีโมจิ
const initialOptions = [
  { text: "ไม่เอาอ่ะะ ไม่อยากแข่ง เหนื่อยเปล่าๆ (_ _)", points: 1 },
  {
    text: "เกมตู้หรือเกมมือถือ ที่มันเล่นขำๆ สนุกๆ ไม่เครียด (｡*_*｡)",
    points: 2,
  },
  { text: "อะไรก็ได้ที่เขาเสนอมา พร้อมลุยตามน้ำ ( •̀⤙•́ )", points: 3 },
  { text: "แข่งอะไรที่ต้องใช้สมอง การวางแผน เช่นหมากรุก ( ่ヘ่ )", points: 4 },
  { text: "แข่งกีฬาลุยๆ ใช้แรงเยอะนี้ของถนัด ! (๑*ー*๑)", points: 5 },
];

function QuizContent5() {
  const router = useRouter();
  const [options, setOptions] = useState<{ text: string; points: number }[]>(
    [],
  );
  const [currentScore, setCurrentScore] = useState(0); // 🔥 ใช้ State แทนการดึงจาก URL

  useEffect(() => {
    const shuffled = [...initialOptions].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
    const saved = sessionStorage.getItem("user_score") || "0";
    setCurrentScore(parseInt(saved));
  }, []);

  const handleAnswer = (points: number) => {
    // ดึงคะแนนเดิมจากกระเป๋าตังค์ (ถ้าไม่มีให้เป็น 0)
    const currentScore = parseInt(sessionStorage.getItem("user_score") || "0");

    // บวกคะแนนใหม่เข้าไป
    const totalScore = currentScore + points;

    // เซฟกลับลงกระเป๋าตังค์
    sessionStorage.setItem("user_score", totalScore.toString());

    // วาร์ปไปหน้าถัดไป (อย่าลืมแก้เลข q ให้ตรงกับหน้าถัดไปนะพี่!)
    router.push("/quiz/q6");
  };

  if (options.length === 0) return null;

  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4 md:py-8 md:px-24 w-full">
      <div className="absolute top-4 right-4 bg-white/50 px-4 py-2 rounded-full text-pink-500 font-bold text-sm">
        คะแนนสะสม: {currentScore}
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-pink-700 bg-white/80 px-6 py-2 rounded-3xl mb-6 text-center shadow-sm w-full max-w-2xl leading-relaxed">
        5. ถ้าต้องแข่ง หรือท้าดวลกับใครสักคน คุณจะเลือกแข่งอะไร?
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
export default function Question5() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <QuizContent5 />
    </Suspense>
  );
}

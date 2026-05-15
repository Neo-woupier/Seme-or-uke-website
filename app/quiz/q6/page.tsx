"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// 1. ตัวเลือกข้อ 6 พร้อมอีโมจิสายเที่ยว
const initialOptions = [
  { text: "คาเฟ่เงียบๆ ถ่ายรูปสวยๆ อ่านหนังสือชิลๆ ( ^-^)_旦", points: 1 },
  { text: "สวนสนุก ดูหนัง หาของอร่อยๆ กิน เน้นเฮฮา ヘ( ^v^)ノ", points: 2 },
  { text: "เดินห้าง ช้อปปิ้งสบายๆ แวะกินข้าว แล้วกลับ(〃‿〃)", points: 3 },
  { text: "ขับรถเที่ยวต่างจังหวัด จัดทริปเองลุยเอง ~(￣▽￣～)", points: 4 },
  {
    text: "แอดเวนเจอร์จัดเต็ม! บุกป่า ปีนเขา กิจกรรมเน้นๆ (๑˃ᴗ˂)🥤",
    points: 5,
  },
];

export default function QuizContent6() {
  const router = useRouter();
  const [options, setOptions] = useState<{ text: string; points: number }[]>(
    [],
  );
  const [currentScore, setCurrentScore] = useState(0);
  useEffect(() => {
    const shuffled = [...initialOptions].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
    const saved = sessionStorage.getItem("user_score") || "0";
    setCurrentScore(parseInt(saved));
  }, []);

  const handleAnswer = (points: number) => {
    const currentScore = parseInt(sessionStorage.getItem("user_score") || "0");
    const totalScore = currentScore + points;

    sessionStorage.setItem("user_score", totalScore.toString());

    router.push("/quiz/q7");
  };

  if (options.length === 0) return null;

  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4 md:py-8 md:px-24 w-full">
      <div className="absolute top-4 right-4 bg-white/50 px-4 py-2 rounded-full text-pink-500 font-bold text-sm">
        คะแนนสะสม: {currentScore}
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-pink-700 bg-white/80 px-6 py-2 rounded-3xl mb-6 text-center shadow-sm w-full max-w-2xl leading-relaxed">
        6. สไตล์การไปเที่ยวพักผ่อนที่ตอบโจทย์คุณที่สุดคือแบบไหน?
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

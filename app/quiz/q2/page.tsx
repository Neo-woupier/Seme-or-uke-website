"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const initialOptions = [
  { text: "เพื่อนชวนทั้งทีนะ (ถึงไม่อยากไปก็เถอะ) แต่ก็ไป~~", points: 1 },
  { text: 'หาข้ออ้างแบบเนียนๆ "พอดีติดธุระที่บ้านอ่ะ โทษทีน้า"', points: 2 },
  {
    text: "ไปด้วยก็ได้ แต่ถ้าเบื่อเมื่อไหร่ขอชิ่งกลับก่อนนะ |-_-|||",
    points: 3,
  },
  { text: 'บอกไปตรงๆ เลยว่า "ขี้เกียจอ่ะ ขอนอน ไว้คราวหน้านะ"', points: 4 },
  { text: 'ปฏิเสธเด็ดขาด "ไม่ไป!" สั้นๆ จบๆ ไม่ต้องมีข้ออ้าง', points: 5 },
];

export default function QuizContent2() {
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
    const totalScore = currentScore + points;
    sessionStorage.setItem("user_score", totalScore.toString());
    router.push("/quiz/q3");
  };

  if (options.length === 0) return null;

  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4 md:py-8 md:px-24 w-full">
      <div className="absolute top-4 right-4 bg-white/50 px-4 py-2 rounded-full text-pink-500 font-bold text-sm shadow-sm border border-pink-100">
        คะแนนสะสม: {currentScore}
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-pink-700 bg-white/80 px-6 py-2 rounded-3xl mb-6 text-center shadow-sm w-full max-w-2xl leading-relaxed">
        2. วันหยุดว่างๆ เพื่อนทักมาชวนไปเที่ยว แต่ใจจริงคุณ "ขี้เกียจไป"
        คุณจะทำยังไง?
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

"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const initialOptions = [
  { text: "ปล่อยจอย ไม่อยากแข่งด้วย สนใจสิ่งที่ทำตรงหน้า", points: 1 },
  { text: "ประหม่าหน่อยๆ แต่ก็รอดูสถานการณ์ไปก่อนละกัน", points: 2 },
  { text: "วิเคราะห์ด้วยเหตุผลว่าสู้ไปแล้วคุ้มไหม", points: 3 },
  { text: "อยากแข่งหรอ? เอาดิได้หมด แต่อย่าแพ้ละกัน!", points: 4 },
  { text: "รับคำท้าสิครับ รออะไร สู้ได้อยู่แล้ว!", points: 5 },
];

export default function QuizContent1() {
  const router = useRouter();
  const [options, setOptions] = useState<{ text: string; points: number }[]>(
    [],
  );
  const [currentScore, setCurrentScore] = useState(0); // 🔥 สร้าง State เก็บคะแนนไว้โชว์

  useEffect(() => {
    // 1. สุ่มลำดับ
    const shuffled = [...initialOptions].sort(() => Math.random() - 0.5);
    setOptions(shuffled);

    // 2. ดึงคะแนนจาก Session มาโชว์ (ปลอดภัยต่อ Vercel)
    const saved = sessionStorage.getItem("user_score") || "0";
    setCurrentScore(parseInt(saved));
  }, []);

  const handleAnswer = (points: number) => {
    const totalScore = currentScore + points;
    sessionStorage.setItem("user_score", totalScore.toString());
    router.push("/quiz/q2"); // URL จะสวยสะอาด ไม่มี ?score=
  };

  if (options.length === 0) return null;

  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4 md:py-8 md:px-24 w-full">
      {/* โชว์คะแนนสะสมแบบหล่อๆ */}
      <div className="absolute top-4 right-4 bg-white/50 px-4 py-2 rounded-full text-pink-500 font-bold text-sm shadow-sm border border-pink-100">
        คะแนนสะสม: {currentScore}
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-pink-700 bg-white/80 px-6 py-2 rounded-3xl mb-6 text-center shadow-sm w-full max-w-2xl leading-relaxed">
        1. เวลาทำอะไรสักอย่างอยู่ แล้วมีคนมาแข่งด้วย สไตล์ของคุณคือ...
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

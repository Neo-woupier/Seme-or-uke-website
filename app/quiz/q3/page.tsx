"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// 1. เปลี่ยนคำตอบและคะแนนเป็นของข้อ 2
const initialOptions = [
  { text: "นอยด์นิดๆ แต่ก้เข้าใจนะ เขาคงมีเหตุผลแหละ( --) ", points: 1 },
  { text: "ใช้วิธีอ้อน ทำตาวิ้งๆ หรือตื้อจนกว่าเขาจะใจอ่อน(◕‿◕✿)", points: 2 },
  { text: "เชอะ! ไม่ได้ไม่เป็นไร หาทำเองได้(﹁.﹁)", points: 3 },
  { text: "ใช้เหตุผลหว่านล้อม โน้มน้าวเก่งจนเขายอมทำตาม(っ´ω`)ﾉ ", points: 4 },
  { text: "มองหน้านิ่งๆ เงียบๆ จนกว่าเขาจะยอม(￣^￣)", points: 5 },
];

function QuizContent3() {
  const router = useRouter();

  // 2. รับคะแนนจากข้อที่แล้วผ่าน URL
  const searchParams = useSearchParams();
  const currentScore = parseInt(searchParams.get("score") || "0");

  const [options, setOptions] = useState<{ text: string; points: number }[]>(
    [],
  );

  // 3. สุ่มลำดับ (Shuffle)
  useEffect(() => {
    const shuffled = [...initialOptions].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
  }, []);

  const handleAnswer = (points: number) => {
    // ดึงคะแนนเดิมจากกระเป๋าตังค์ (ถ้าไม่มีให้เป็น 0)
    const currentScore = parseInt(sessionStorage.getItem("user_score") || "0");

    // บวกคะแนนใหม่เข้าไป
    const totalScore = currentScore + points;

    // เซฟกลับลงกระเป๋าตังค์
    sessionStorage.setItem("user_score", totalScore.toString());

    // วาร์ปไปหน้าถัดไป (อย่าลืมแก้เลข q ให้ตรงกับหน้าถัดไปนะพี่!)
    router.push("/quiz/q4");
  };

  if (options.length === 0) return null;

  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4 md:py-8 md:px-24 w-full">
      {/* (ลบออกได้นะ) ใส่ไว้ให้ Bro ดูว่าคะแนนมันถูกส่งมาจริงไหม */}
      <div className="absolute top-4 right-4 bg-white/50 px-4 py-2 rounded-full text-pink-500 font-bold text-sm">
        คะแนนสะสม: {currentScore}
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-pink-700 bg-white/80 px-6 py-2 rounded-3xl mb-6 text-center shadow-sm w-full max-w-2xl leading-relaxed">
        3.: เวลาคุณอยากได้อะไรมากๆ แต่คนรอบข้างOK ไม่ยอม คุณจะ...
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
export default function Question3() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <QuizContent3 />
    </Suspense>
  );
}

"use client"; // [REQUIRED] ใช้ Framer Motion และ State ต้องรันที่ฝั่ง Client เท่านั้น
import { useEffect, useState } from "react"; // [REACT HOOKS] ใช้จัดการวงจรชีวิตและข้อมูลในหน้าเว็บ
import { motion } from "framer-motion"; // [ANIMATION] ใช้ทำเอฟเฟกต์เคลื่อนไหว (Fade in/out)
import { useRouter } from "next/navigation"; // [NAVIGATION] ใช้สำหรับเปลี่ยนหน้าเมื่อทำควิซเสร็จ
/*
  data configuration: initialOptions
  - เก็บรายการคำตอบแตจ่ละข้อ
  - โครงสร้างข้อมูล: Array of Objects
    1. text: ข้อความที่จะโชว์บนปุ่มให้ User เลือก
    2. points: คะแนนที่ได้รับ (1 = เคะมาก -> 5 = เมะมาก)
*/
const initialOptions = [
  { text: "ปล่อยจอย ไม่อยากแข่งด้วย สนใจสิ่งที่ทำตรงหน้า", points: 1 },
  { text: "ประหม่าหน่อยๆ แต่ก็รอดูสถานการณ์ไปก่อนละกัน", points: 2 },
  { text: "วิเคราะห์ด้วยเหตุผลว่าสู้ไปแล้วคุ้มไหม", points: 3 },
  { text: "อยากแข่งหรอ? เอาดิได้หมด แต่อย่าแพ้ละกัน!", points: 4 },
  { text: "รับคำท้าสิครับ รออะไร สู้ได้อยู่แล้ว!", points: 5 },
];

export default function QuizContent1() {
  const router = useRouter(); // // ตัวช่วยเปลี่ยนหน้า (ใช้ตอนตอบเสร็จแล้วไปข้อถัดไป)
  /*
    state: management
    - options: เก็บรายการคำตอบที่สุ่มลำดับแล้ว (Shuffle) เพื่อไม่ให้คำตอบอยู่ที่เดิมทุกรอบ
    - currentScore: คะแนนสะสมที่ดึงมาจาก Session (เอาไว้โชว์ให้คนเล่นรู้ว่าตอนนี้ได้เท่าไหร่)
  */
  const [options, setOptions] = useState<{ text: string; points: number }[]>(
    [],
  );
  const [currentScore, setCurrentScore] = useState(0);
  /*
    page iniialization: useeffact
    - ทำงานครั้งเดียวตอนที่ "หน้าเว็บโหลดเสร็จ" (Mounting)
    - หน้าที่ 1: สุ่มลำดับตัวเลือก (Shuffle Algorithm)
    - หน้าที่ 2: ดึงคะแนนล่าสุดจาก sessionStorage มาเตรียมไว้
  */
  useEffect(() => {
    // การสุ่มลำดับ: ก๊อปปี้ค่าเริ่มต้นมาสลับตำแหน่งแบบ Random
    const shuffled = [...initialOptions].sort(() => Math.random() - 0.5);
    setOptions(shuffled);

    // 2. ดึงคะแนนจาก Session มาโชว์ (ปลอดภัยต่อ Vercel)
    // - ถ้าไม่มีค่า (null) ให้เริ่มที่ "0"
    // - parseInt: แปลงจากตัวหนังสือ (String) ให้กลับมาเป็นตัวเลข (Number) เพื่อเอาไปบวกต่อได้
    const saved = sessionStorage.getItem("user_score") || "0";
    setCurrentScore(parseInt(saved));
  }, []);

  /*
    fuction; handleAnswer
    - วัตถุประสงค์: บันทึกคะแนนของข้อนี้ และส่งผู้เล่นไปข้อถัดไป
    - คำนวณคะแนนใหม่โดยเอา (คะแนนเดิมที่มี + คะแนนจากข้อที่เพิ่งกด)
    - บันทึกค่าลง sessionStorage โดยต้องแปลงเป็นตัวหนังสือ (.toString()) 
        *หมายเหตุ: Storage เก็บได้แค่ข้อความเท่านั้น*
    - เปลี่ยนหน้าไปหน้าถัดไป (/quiz/q2) 
        *ข้อดี: URL จะสะอาด ไม่โชว์คะแนนให้คนแอบแก้เล่น*
  */
  const handleAnswer = (points: number) => {
    const totalScore = currentScore + points;
    sessionStorage.setItem("user_score", totalScore.toString());
    router.push("/quiz/q2"); // URL จะสวยสะอาด ไม่มี ?score=
  };

  /*
    conditiom rendering: loading state
    - ป้องกัน Error: "Cannot read property of undefined"
    - ถ้าข้อมูลตัวเลือก (options) ยังโหลดไม่เสร็จ หรือสุ่มไม่เสร็จ
    - ให้คืนค่า null (หน้าว่าง) เพื่อรอให้ useEffect ทำงานเสร็จก่อน
  */
  if (options.length === 0) return null;

  return (
    /*
      main container
      - flex-grow: สั่งให้กินพื้นที่ที่เหลือทั้งหมด (เพื่อให้ Footer ไม่ลอยขึ้นมากลางจอ)
      - p-4 md:py-8 md:px-24: ปรับระยะห่างตามขนาดหน้าจอ (Mobile จะแคบกว่า Desktop)
    */
    <main className="flex flex-col items-center justify-center flex-grow p-4 md:py-8 md:px-24 w-full">
      {/*
        floating: score badge
        - absolute top-4 right-4: ปักหมุดไว้มุมขวาบนของหน้าจอเสมอ
        - bg-white/50 + backdrop-blur (ถ้ามี): ช่วยให้ดูโปร่งแสง ทันสมัย
        - โชว์ค่า currentScore ที่เราดึงมาจาก sessionStorage
      */}
      {/* โชว์คะแนนสะสมแบบหล่อๆ */}
      <div className="absolute top-4 right-4 bg-white/50 px-4 py-2 rounded-full text-pink-500 font-bold text-sm shadow-sm border border-pink-100">
        คะแนนสะสม: {currentScore}
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-pink-700 bg-white/80 px-6 py-2 rounded-3xl mb-6 text-center shadow-sm w-full max-w-2xl leading-relaxed">
        1. เวลาทำอะไรสักอย่างอยู่ แล้วมีคนมาแข่งด้วย สไตล์ของคุณคือ...
      </h1>
      /* option grid sytem - grid-cols-1 md:grid-cols-2: จอมือถือเรียงแถวเดียว
      จอคอมแบ่งเป็น 2 คอลัมน์ - gap-x-6 gap-y-4:
      เว้นระยะห่างระหว่างปุ่มให้ดูไม่อึดอัด */
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full max-w-2xl">
        {options.map((option, index) => (
          /*
            animetion button 
            - whileHover: ขยายขนาด 6% เมื่อเอาเมาส์วาง (ดู Interactive)
            - whileTap: หดตัวเล็กน้อยเมื่อกด (เหมือนปุ่มจริงๆ โดนยุบลงไป)
            - Special Logic: ถ้าเป็นปุ่มที่ 5 (index 4) ให้กินพื้นที่ 2 คอลัมน์ 
              * เพื่อให้ปุ่มสุดท้ายดูเด่น หรือจัดกึ่งกลางได้สวยขึ้นบน Desktop
          */
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

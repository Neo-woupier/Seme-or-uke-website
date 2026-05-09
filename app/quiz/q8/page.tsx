"use client";

import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

// 1. ข้อมูลผลลัพธ์ (รองรับการใส่ GIF ตรง gifUrl)
const resultData = (score: number) => {
  if (score >= 31)
    return {
      title: "🔥 เมะตัวพ่อ / จ่าฝูง (The Absolute Alpha)",
      desc: "คุณคือ 'ผู้คุมเกม' อย่างแท้จริง! เด็ดขาด ชัดเจน และมีเป้าหมาย ไม่ชอบเป็นรองใคร บุคลิกของคุณทรงพลังและดึงดูดให้คนรอบข้างยอมสยบ คุณชอบเป็นฝ่าย Take Action และจัดการทุกอย่างให้เป๊ะ ความรักของคุณคือการปกป้องและครอบครองอย่างมีชั้นเชิง ใครอยู่ใกล้จะสัมผัสได้ถึง 'ความมั่นคง' ที่แท้จริง",
      gifUrl: "/foxx.gif",
    };
  if (score >= 25)
    return {
      title: "☀️ เมะสายอบอุ่น (The Gentle Guardian)",
      desc: "คุณมีออร่า 'ผู้นำ' ที่สุขุมและน่าเกรงขาม แข็งแกร่งด้วยวุฒิภาวะและความใจเย็น คุณชอบเป็นผู้ดูแล เป็นที่ปรึกษา และเป็นที่พักพิงให้คนอื่น ความสุขของคุณคือการได้เห็นคนที่รักยิ้มได้ คุณคุมสถานการณ์ได้นุ่มนวล ทำให้คนข้างกายรู้สึกปลอดภัยและพร้อมเดินตามโดยไม่มีข้อกังขา",
      gifUrl: "/fox.gif",
    };
  if (score >= 19)
    return {
      title: "🔄 สายสลับโพ (The Versatile Chameleon)",
      desc: "คุณมีความยืดหยุ่นและปรับตัวเก่งมาก! ทุกอย่างขึ้นอยู่กับ 'เคมี' ของคนตรงหน้า ถ้าเขาซอฟต์ คุณพร้อมเป็นผู้นำสุดเท่ แต่ถ้าเขาสตรอง คุณก็พับความดื้อแล้วกลายเป็นคนขี้อ้อนได้อย่างเป็นธรรมชาติ คุณอ่านสถานการณ์ขาด และรู้วิธีบริหารเสน่ห์ให้เข้ากับคู่ของคุณได้อย่างยอดเยี่ยม",
      gifUrl: "/otter.gif",
    };
  if (score >= 13)
    return {
      title: "😼 เคะแอบซ่า / ซึนเดเระ (The Spunky Tsundere)",
      desc: "ภายนอกดูดื้อรั้นและแอบซ่าเหมือน 'แมวส้ม' ที่พร้อมแยกเขี้ยว แต่จริงๆ นั่นคือเกราะป้องกันตัว ลึกๆ แล้วคุณนุ่มนิ่มและแพ้ทางคนจริงใจที่ดูแลคุณได้ แม้ปากจะบ่นว่ารำคาญ แต่ใจก็แอบเช็กตลอดว่าเขายังสนใจไหม คุณแค่ต้องการคนที่ 'เอาคุณอยู่' และพร้อมกอดคุณในวันที่ยอมลดกำแพงลง",
      gifUrl: "/hamter.gif",
    };
  return {
    title: "🌸 เคะตัวน้อยน่าทะนุถนอม (The Pure Heart)",
    desc: "คุณคือคำนิยามของความนุ่มฟูและอ่อนโยน มีออร่าที่ทำให้คนรอบข้างอยากปกป้อง คุณมักจะประนีประนอมและแคร์ความรู้สึกคนอื่นเป็นที่หนึ่ง การเป็น 'ผู้ตาม' ของคุณไม่ใช่เพราะไม่มีจุดยืน แต่เพราะคุณมีความสุขกับการถูกเอาใจใส่ การมีใครสักคนคอยนำทางและเป็นเซฟโซนให้ คือสิ่งที่ดีที่สุดสำหรับคุณ",
    gifUrl: "/rapbit.gif",
  };
};

function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get("score") || "0");
  const result = resultData(score);
  const [neutralCount, setNeutralCount] = useState(0);
  const [ukeCount, setUkeCount] = useState(0);
  const [semeCount, setSemeCount] = useState(0);
  const [step, setStep] = useState(0); // 0: คุณเป็น, 1: ผลลัพธ์, 2: Leaderboard
  const [typedText, setTypedText] = useState("");

  // --- 🔒 ป้องกันการกดย้อนกลับ (Anti-Cheat) ---
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      router.replace("/"); // ถ้ากดย้อนกลับ ให้เด้งไปหน้าเริ่มทันที
    };
  }, [router]);

  // --- 🎬 Animation Sequence ---
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000); // ดีเลย์ 1.5 วิ ก่อนโชว์ผลลัพธ์
    return () => clearTimeout(timer1);
  }, []);

  // --- ⌨️ Typewriter Effect ---
  useEffect(() => {
    if (step >= 1) {
      let i = 0;
      const text = result.desc;
      const interval = setInterval(() => {
        setTypedText(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 100); // ความเร็วในการพิมพ์
      return () => clearInterval(interval);
    }
  }, [step, result.desc]);

  // --- 📊 Leaderboard Logic (จำลองค่ารอ Backend) ---
  // สมมติค่าจาก DB (ถ้าทำ Backend จริงต้องดึงจาก API)
  useEffect(() => {
    // ฟังก์ชันดึงสถิติจาก MongoDB
    const fetchStats = async () => {
      try {
        // 1. ส่งผลลัพธ์ของเราไปบันทึกก่อน (สมมติ resultTitle คือชื่อโพที่ได้ เช่น "เมะตัวพ่อ")
        await fetch("/api/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resultName: result.title }),
        });

        // 2. พอบันทึกเสร็จ ก็ดึงสถิติรวมของทุกคนมาโชว์
        const response = await fetch("/api/status");
        const data = await response.json();
        console.log("ข้อมูลจาก DB", data);

        // 3. แยกหมวดหมู่ (สมมติว่าถ้าชื่อโพมีคำว่า "เคะ" ให้รวมเป็น Uke, มีคำว่า "เมะ" ให้รวมเป็น Seme)
        let totalUke = 0;
        let totalSeme = 0;
        let totalNeutral = 0;

        if (Array.isArray(data)) {
          data.forEach((item: any) => {
            if (item.resultName?.includes("เคะ")) {
              totalUke += item.playCount;
            } else if (item.resultName?.includes("เมะ")) {
              totalSeme += item.playCount;
            } else {
              // ✅ พระเอกของเราอยู่ตรงนี้! ถ้าไม่มีคำว่าเคะและเมะ (เช่น สายสลับโพ) ให้บวกเข้าสายกลาง
              totalNeutral += item.playCount;
            }
          });
        }

        setUkeCount(totalUke);
        setSemeCount(totalSeme);
        setNeutralCount(totalNeutral);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  const totalPlayers = ukeCount + semeCount + neutralCount;

  // คำนวณ % แบ่งเป็น 3 ขา
  const ukePercent =
    totalPlayers === 0 ? 33 : Math.round((ukeCount / totalPlayers) * 100);
  const neutralPercent =
    totalPlayers === 0 ? 34 : Math.round((neutralCount / totalPlayers) * 100);
  const semePercent =
    totalPlayers === 0 ? 33 : 100 - (ukePercent + neutralPercent); // ใช้ลบเอาจะได้รวมกันได้ 100 เป๊ะ

  return (
    <main className="flex flex-col items-center justify-center p-6 text-center">
      {/* 1. หัวข้อ: คุณเป็น... */}
      {step == 0 && (
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-8xl text-[#FF69B4] font-bold mb-2"
        >
          คุณ
          <span className="mx-2 text-[#01d487] drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]">
            เป็น....
          </span>
        </motion.h2>
      )}

      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className="flex flex-col items-center"
          >
            {/* 2. ชื่อประเภท + คะแนน */}
            <h1 className="text-4xl md:text-5xl font-black text-pink-600 mb-2 drop-shadow-lg">
              {result.title}
            </h1>
            <p className="text-xl font-bold text-rose-400 mb-6">
              {score} คะแนน
            </p>

            {/* 3. GIF Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-64 h-64 rounded-3xl overflow-hidden border-4 border-white shadow-2xl mb-8"
            >
              <img
                src={result.gifUrl}
                alt="Result GIF"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* 4. Description (Typewriter) */}
            <div className="max-w-md  mb-10">
              <p className="text-lg text-gray-800 leading-relaxed font-medium">
                {typedText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-1 h-5 bg-pink-500 ml-1 align-middle"
                />
              </p>
            </div>

            {/* 5. Leaderboard HP Bar */}
            <div className="flex justify-between mb-2 font-bold text-[20px] md:text-sm">
              <span className="text-pink-500">เคะ {ukePercent}%</span>
              <span className="text-emerald-500">
                สายกลาง {neutralPercent}%
              </span>
              <span className="text-blue-500">เมะ {semePercent}%</span>
            </div>

            {/* หลอด HP 3 สี */}
            <div className="w-full h-8 md:10 md-10 md:md-10 bg-[#ffffff] rounded-full overflow-hidden flex border-4 border-[#fa6df5] shadow-inner">
              {/* ฝั่งเคะ */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${ukePercent}%` }}
                transition={{ duration: 1.5 }}
                className="h-full bg-gradient-to-r from-pink-400 to-rose-300 flex items-center justify-center text-white text-[10px]"
              >
                {ukePercent > 10 && "Uke"}
              </motion.div>

              {/* ฝั่งสายกลาง (เพิ่มเข้ามาใหม่!) */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${neutralPercent}%` }}
                transition={{ duration: 1.5 }}
                className="h-full bg-gradient-to-r from-emerald-300 to-teal-400 flex items-center justify-center text-white text-[10px] border-x border-white/20"
              >
                {neutralPercent > 10 && "Mid"}
              </motion.div>

              {/* ฝั่งเมะ */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${semePercent}%` }}
                transition={{ duration: 1.5 }}
                className="h-full bg-gradient-to-r from-blue-300 to-blue-500 flex items-center justify-center text-white text-[10px]"
              >
                {semePercent > 10 && "Seme"}
              </motion.div>
            </div>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white text-pink-500 font-black py-6 px-12 rounded-full shadow-xl border-2 border-pink-100 mt-8 mb-20"
              >
                กลับหน้าหลัก 🏠
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function Question8() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <ResultPage />
    </Suspense>
  );
}

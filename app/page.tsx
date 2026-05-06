// app/page.tsx
import { Button } from "@/components/ui/button" // เรียก library มาใช้นะจ้ะๆ
import Link from "next/link" // 👈 ต้องมีบรรทัดนี้ ไม่งั้น Link จะแดง!

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 overflow-hidden">
      
      
      <h1 className="font-bold text-[#6DBFC2] mb-4 text-center leading-tight">
  
        {/* คำว่า "เมะ" */}
        <span className="block md:inline mx-2 text-8xl md:text-10xl text-[#FF69B4] drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]">
          เมะ
        </span>
  
        {/* คำว่า "หรือ" */}
        <span className="block md:inline text-5xl md:text-5xl">
          หรือ
        </span>
  
        {/* คำว่า "เคะ" */}
        <span className="block md:inline mx-2 text-8xl md:text-10xl text-[#BA55D3] drop-shadow-[0_0_10px_rgba(186,85,211,0.8)]">
          เคะ
        </span>
      </h1>


      <p className="mt-20 text-gray-700 ">
        อยากรู้ไหม ลองตอบคำถามพวกนี้ดู (ตอบตามความรู้สีกนะ) 
      </p>

      {/*Bro </Link> ต่องปิดหน้าท้ายนะหนุ่ม*/}
      <Link href="/quiz/q1">
        <Button
          variant="pink"
          className="mt-5 rounded-full px-8 py-6 text-lg font-semibold text-pink-700"
          >
          ตอบคำถามเลย~~
        </Button>
      </Link>
    </main>
  );
} 
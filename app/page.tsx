// app/page.tsx
import { Button } from "@/components/ui/button" //

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 overflow-hidden">
      
      {/* 2. Layer พื้นหลัง: ใส่ GIF */}
      <img
        src="/background.gif" // 👈 อย่าลืมตรวจสอบชื่อไฟล์ GIF ของคุณใน public folder
        alt="Background"
        className="
          absolute top-0 left-0 
          w-full h-full 
          object-cover // 👈 ทำให้ภาพ GIF ขยายคลุมพื้นที่ทั้งหมดโดยไม่เสียสัดส่วน
          object-center // 👈 จัดให้จุดกึ่งกลางของภาพอยู่ตรงกลางหน้าจอ
          z-0 // 👈 วางไว้ Layer ต่ำที่สุด
        "
      />
 
      {/* 3. Layer เนื้อหา: ซ้อนอยู่เหนือ GIF */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
      
      <h1 className="text-8xl font-bold text-[#6DBFC2] mb-1">
        เป็น 
        {/* 2. คำว่า เมะ ที่มีเอฟเฟกต์ฟุ้งๆ สีชมพู */} 
        <span className="mx-2 text-[#FF69B4] drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]">
          เมะ
        </span> 
        หรือ 
        {/* 3. คำว่า เคะ ที่มีเอฟเฟกต์ฟุ้งๆ สีม่วงอ่อน */}
        <span className="mx-2 text-[#BA55D3] drop-shadow-[0_0_10px_rgba(186,85,211,0.8)]">
          เคะ
        </span> 
      </h1>
      <p className="mt-20 text-gray-700 ">
        อยากรู้ไหม ลองตอบคำถามพวกนี้ดู (ตอบตามความรู้สีกนะ) 
      </p>
      {/* เดี๋ยวเราจะเอาปุ่มเริ่มเกมมาใส่ตรงนี้ */}
      
      <Button
        variant="pink"
        className="mt-5 rounded-full px-8 py-6 text-lg font-semibold text-pink-700"
        >
        ตอบคำถามเลย~~
      </Button>
      </div>
    </main>
  );
} 
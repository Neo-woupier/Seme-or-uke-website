// app/page.tsx

"use client"; // ต้องมีคำนี้เสมอถ้าจะใช้ Event (คลิก) หรือ Hooks (router) เพราะ Next.js  Server Component
/*
^ ปุ่มสำเร็จรูปจาก shadcn/ui (แก้ดีไซน์ได้ที่ components/ui/button.tsx)
^ ตัวนำทาง (Navigator) สำหรับเปลี่ยนหน้าแบบไม่ต้อง Refresh (Client-side)
*/
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  /*
    NAVIGATION TOOL
  */
  const router = useRouter();
  /*
    function handleStartGame
    - ล้างคะแนนเก่า (user_score) ทิ้งก่อนเพื่อความชัวร์ .removeitem
    - เซ็ตคะแนนเริ่มต้นเป็น "0" ในหน่วยความจำชั่วคราว (sessionStorage) โดยใข้ .setitem
    - Logic 3: พุ่งตัวไปที่หน้า Quiz ข้อที่ 1 (/quiz/q1) pushpushpush
  */
  const handleStartGame = () => {
    sessionStorage.removeItem("user_score");
    sessionStorage.setItem("user_score", "0");
    router.push("/quiz/q1");
  };

  return (
    /*
       layout main control 
       - flex: เปิดระบบจัดวางแบบ Flexible (ยืดหยุ่น) เพื่อให้ลูกๆ จัดระเบียบง่าย
       - min-h-screen: บังคับให้ความสูงอย่างน้อยต้องเต็มหน้าจอพอดี (ไม่ให้พื้นหลังขาด)
       - flex-col: สั่งให้ลูกๆ (เมะ/หรือ/เคะ) เรียงกันเป็นแนวตั้ง (จากบนลงล่าง) กรณี จอเล็ก
       - items-center: จัดลูกๆ ให้อยู่กึ่งกลางในแนวนอน (ซ้าย-ขวา)
       - justify-center: จัดลูกๆ ให้อยู่กึ่งกลางในแนวตั้ง (บน-ล่าง)
          *หมายเหตุ: เมื่อใช้ 4+5 คู่กัน ทุกอย่างจะอยู่กลางจอเป๊ะ*
       - p-24: เว้นระยะห่างจากขอบจอเข้ามา 96px (6rem) เพื่อไม่ให้เนื้อหาชิดขอบเกินไป
       - overflow-hidden: [คำเตือน] สั่งตัดเนื้อหาที่แลบออกนอกจอทิ้ง 
          *ใช้เพื่อกันไม่ให้เกิด Scrollbar แนวนอนในกรณีที่มี Animation วิ่งไปมา
      */
    <main className="flex min-h-screen flex-col items-center justify-center p-24 overflow-hidden">
      {/*
        header section: the title
        - ใช้ h1 เป็นตัวหุ้มข้อความหลักเพื่อ SEO
        - leading-tight: ปรับระยะห่างระหว่างบรรทัดให้ชิดกัน เพื่อให้ดูเป็นก้อนเดียวกัน
        - drop-shadow: ทำเอฟเฟกต์แสงฟุ้ง (Glow) รอบตัวอักษรสีชมพู
      */}
      <h1 className="font-bold text-[#6DBFC2] mb-4 text-center leading-tight">
        {/* คำว่า "เมะ" */}
        <span className="block md:inline mx-2 text-8xl md:text-10xl text-[#FF69B4] drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]">
          เมะ
        </span>

        {/* คำว่า "หรือ" */}
        <span className="block md:inline text-5xl md:text-5xl">หรือ</span>

        {/* คำว่า "เคะ" */}
        <span className="block md:inline mx-2 text-8xl md:text-10xl text-[#BA55D3] drop-shadow-[0_0_10px_rgba(186,85,211,0.8)]">
          เคะ
        </span>
      </h1>

      <p className="mt-20 text-gray-700 ">
        อยากรู้ไหม ลองตอบคำถามพวกนี้ดู (ตอบตามความรู้สีกนะ)
      </p>

      {/*Bro </Link> ต่องปิดหน้าท้ายนะหนุ่ม*/}

      <Button
        /*
          button: starquiz
          - variant="pink": เลือกใช้สไตล์สีชมพู (ต้องไปเช็คการตั้งค่าสีนี้ใน components/ui/button.tsx)
          - mt-5: เว้นระยะห่างจากข้อความด้านบน (Margin Top) ออกมาเล็กน้อย
          - rounded-full: ปรับขอบปุ่มให้โค้งมนเป็นรูปวงรี (Pill shape) ดูเป็นมิตรและทันสมัย
          - px-8 py-6: ขยายขนาดปุ่มให้ใหญ่และกดง่าย
          - text-lg font-semibold: ปรับตัวอักษรให้ใหญ่และหนาปานกลาง เพื่อให้เป็นจุดสนใจหลัก (CTA)
          - onClick: เมื่อกดปุ่ม จะไปเรียกใช้ฟังก์ชัน handleStartGame เพื่อล้างคะแนนและเริ่มควิซ
        */
        variant="pink"
        className="mt-5 rounded-full px-8 py-6 text-lg font-semibold text-pink-700"
        onClick={handleStartGame}
      >
        ตอบคำถามเลย~~
      </Button>
    </main>
  );
}

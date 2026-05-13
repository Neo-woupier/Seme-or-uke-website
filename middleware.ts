import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ใช้ Map ในหน่วยความจำเก็บข้อมูล (หมายเหตุ: บน Vercel ค่านี้จะรีเซ็ตบ่อย แต่กันสแปมเบื้องต้นได้)
const requestLogs = new Map<
  string,
  { count: number; lastRequest: number; bannedUntil: number }
>();

export function middleware(request: NextRequest) {
  // ตรงบรรทัดที่ดึง IP ให้เปลี่ยนเป็นแบบนี้:
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";
  const now = Date.now();
  const userData = requestLogs.get(ip) || {
    count: 0,
    lastRequest: now,
    bannedUntil: 0,
  };
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const allowedDomains = ["same-or-uke.vercel.app", "localhost:3000"];
  const isAllowed = allowedDomains.some(
    (domain) => referer?.includes(domain) || origin?.includes(domain),
  );

  // คำนวณไว้ก่อนว่า "คนนี้คนกันเองไหม"
  const isAllowed = allowedDomains.some(
    (domain) => referer?.includes(domain) || origin?.includes(domain),
  );

  // ถ้าเป็น Method POST (เช่น การส่งคะแนน) ให้เช็กที่มา
  if (request.method === "POST") {
    // ถ้าไม่มี Origin หรือ Referer หรือข้อมูลที่มาไม่ตรงกับเว็บเรา
    if (!isAllowed) {
      return new NextResponse(
        "What the ?????? (ไม่อนุญาตให้เข้าถึงจากภายนอก)",
        { status: 403 },
      );
    }
  }

  // 1. เช็กว่ายังอยู่ในช่วงเวลาที่โดนแบนไหม
  if (userData.bannedUntil > now) {
    return new NextResponse(
      `ใจเย็นๆ วัยรุ่น! คุณโดนแบนชั่วคราว เหลือเวลาอีก ${timeLeft} วินาที`,
      { status: 403 },
    );
  }

  // 2. ลอจิกนับจำนวนการเข้าชม (เช่น เกิน 20 ครั้งใน 10 วินาที = สแปม)
  if (now - userData.lastRequest < 10000) {
    // ช่วง 10 วินาที
    userData.count++;
  } else {
    userData.count = 1; // เริ่มนับใหม่ถ้าผ่านไปนานแล้ว
  }

  userData.lastRequest = now;

  // ถ้ากดรัวเกิน 30 ครั้งในเวลาสั้นๆ สั่งแบน 1 นาที
  if (userData.count > 15) {
    userData.bannedUntil = now + 60000; // แบนไป 60,000 ms (1 นาที)
    requestLogs.set(ip, userData);
    return new NextResponse("Yeeeeeeeeeeee", { status: 403 });
  }

  requestLogs.set(ip, userData);
  return NextResponse.next();
}

// เลือกหน้าที่ต้องการให้ยามคนนี้เฝ้า
export const config = {
  matcher: ["/quiz/:path*", "/api/:path*"], // เฝ้าทุกหน้าใน quiz และทุก API
};

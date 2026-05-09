import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
// 1. นำเข้า headers
import { headers } from "next/headers";
import { NextRequest } from "next/server";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

// --- 📥 ขา GET: ดึงสถิติทั้งหมดมาโชว์ ---
export async function GET() {
  // 2. แอบดูข้อมูลคนเรียก

  const headersList = await headers();
  const referer = headersList.get("referer"); // ดูว่ามาจากเว็บไหน

  // 3. ถ้าไม่ได้มาจากเว็บเรา (ก๊อปไปเปิดเองตรงๆ) ให้ด่ากลับไป!
  if (
    !referer ||
    (!referer.includes("seme-or-uke-website.vercel.app") &&
      !referer.includes("localhost"))
  ) {
    return NextResponse.json({ error: "yeeeeeeeeeeeeeee" }, { status: 403 });
  }
  try {
    await client.connect();
    const database = client.db("quiz_db");
    const collection = database.collection("stats");
    const stats = await collection.find({}).toArray();
    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "ดึงข้อมูลไม่สำเร็จ" },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}

// --- 📤 ขา POST: บันทึกคะแนนใหม่เข้าไป ---
export async function POST(request: Request) {
  try {
    const { resultName } = await request.json();
    if (!resultName) {
      return NextResponse.json({ message: "Yo bro who is " }, { status: 400 });
    }
    await client.connect();
    const database = client.db("quiz_db");
    const collection = database.collection("stats");

    await collection.updateOne(
      { resultName },
      { $inc: { playCount: 1 } },
      { upsert: true }, // ถ้ายังไม่มีโพนี้ใน DB ให้สร้างใหม่เลย
    );

    return NextResponse.json({ message: "บันทึกสำเร็จ" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "บันทึกไม่สำเร็จ" }, { status: 500 });
  } finally {
    await client.close();
  }
}

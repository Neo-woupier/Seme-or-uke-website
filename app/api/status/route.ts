import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

// --- 📥 ขา GET: ดึงสถิติทั้งหมดมาโชว์ ---
export async function GET() {
  try {
    await client.connect();
    const database = client.db('quiz_db');
    const collection = database.collection('stats');
    const stats = await collection.find({}).toArray();
    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'ดึงข้อมูลไม่สำเร็จ' }, { status: 500 });
  } finally {
    await client.close();
  }
}

// --- 📤 ขา POST: บันทึกคะแนนใหม่เข้าไป ---
export async function POST(request: Request) {
  try {
    const { resultName } = await request.json();
    await client.connect();
    const database = client.db('quiz_db');
    const collection = database.collection('stats');

    await collection.updateOne(
      { resultName },
      { $inc: { playCount: 1 } },
      { upsert: true } // ถ้ายังไม่มีโพนี้ใน DB ให้สร้างใหม่เลย
    );

    return NextResponse.json({ message: 'บันทึกสำเร็จ' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'บันทึกไม่สำเร็จ' }, { status: 500 });
  } finally {
    await client.close();
  }
}
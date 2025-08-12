import connectDb from "@/db/connetdb";
import Userlink from "@/models/Userlink";
import { NextResponse } from "next/server";

export async function POST(req) {
    // const body=await request.json();
    // console.log(body);
    await connectDb();
    try {
      const { links } = await req.json();
      const newDoc = await Userlink.create({ links });
      // await newDoc.save();
      return NextResponse.json({ success: true, data: newDoc }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
    console.log('Request received:', body);
  return Response.json({ message: 'Hello World' })
}
import connectDb from "@/db/connetdb";
import Userlink from "@/models/Userlink";
import { NextResponse } from "next/server";

export async function POST(req) {
    // const body=await request.json();
    // console.log(body);
    await connectDb();
    try {
      const { user,links } = await req.json();
      // if (!user || !links || !Array.isArray(links)) {
      //   return NextResponse.json(
      //     { success: false, error: "Invalid input data",data: "nil" },
      //     { status: 400 }
      //   );
      // }
      let newDoc = await Userlink.findOne({ user });
      if ( !newDoc) {
        // If user does not exist, create a new document
        newDoc = await Userlink.create({user,
           links });
        return NextResponse.json
         ({ success: true, data: newDoc,user:"Created"}, { status: 201 })
        }else{
        newDoc.links.push(...links);
       await newDoc.save();
      return NextResponse.json({ success: true, data: newDoc,user:"Existing" }, { status: 201 });
        }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
    console.log('Request received:', body);
  return Response.json({ message: 'Hello World' })
}
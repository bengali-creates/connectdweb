import User from "@/models/User";
import Userlink from "@/models/Userlink";
import connectDb from "@/db/connetdb";
import { NextResponse } from "next/server";

export async function GET(req,{ params }) {
    try{
    await connectDb();
    const { searchParams } = new URL(req.url);
    const ogusername = searchParams.get('ogusername');
    // const {name}=params
    // console.log('name',name);
console.log('ogusername',ogusername);

    
    if(!ogusername){
      return NextResponse.json(
        { success: false, error: "Name parameter is required" },
        { status: 400 }
      );
    }
    const user= await User.findOne({ogusername:ogusername});
    const userlink= await Userlink.findOne({user:ogusername});
    if(!user && !userlink){
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: user, userlink:userlink },
      { status: 200 }
    );


    }
    catch(error){
      return NextResponse.json(
        { success: false, error: "Database connection error" },
        { status: 500 }
      );
    }
}
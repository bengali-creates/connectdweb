import connectDb from "@/db/connetdb";
import Userlink from "@/models/Userlink";
import next from "next";
import { NextResponse } from "next/server";

export async function PATCH(req,{ params }) {
  try {
    await connectDb();
    const {id}=params;
    const { user, updatedLink } = await req.json();
    
    if (!id || !user || !updatedLink) {
      return NextResponse.json(
        { success: false, error: "parameters are required" },
        { status: 400 }
      );
    }
    
    const userLink = await Userlink.findOne({  user });
    if (!userLink) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    } 
    const link=userLink.links.id(id);
    if(!link){
      return NextResponse.json(
        { success: false, error: "Link from id not found" },
        { status: 404 }
      );
    }

    link.link=updatedLink.link||link.link;
    link.linktext=updatedLink.linktext||link.linktext
     await userLink.save();

    return NextResponse.json(
      { success: true, data: userLink },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req,context){
  try{
    
    await connectDb();
    const {params}=context;
    const {id}= await params;
    const { user } = await req.json();
    if (!id || !user) {
      return NextResponse.json(
      { success: false, error: "parameters required" },
      { status: 500 }
    );
    }
    const userLink = await Userlink .findOne({ user });
    if (!userLink) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }
    const delLink=userLink.links.id(id)
    if(!delLink){
      return NextResponse.json(
        { success: false, error: "Link from id not found" },
        { status: 404 }
      );
    }
    await delLink.deleteOne();
    await userLink.save();
    return NextResponse.json(
      { success: true, data: userLink },
      { status: 200 }
    );



  }catch(error){
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
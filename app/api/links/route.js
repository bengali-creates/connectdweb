import connectDb from "@/db/connetdb";
export async function POST(request) {
    const body=await request.json();
    console.log(body);
    await connectDb();
  return Response.json({ message: 'Hello World' })
}
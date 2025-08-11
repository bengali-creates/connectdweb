import connectDb from "@/db/connetdb";
export async function POST(request) {
    // const body=await request.json();
    // console.log(body);
    await connectDb();
    try {
      const { links } = req.body;
      const newDoc = new LinksArray({ links });
      await newDoc.save();
      res.status(201).json({ success: true, data: newDoc });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    console.log('Request received:', body);
  return Response.json({ message: 'Hello World' })
}
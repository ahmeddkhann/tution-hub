import messageModel from "@/app/models/message.models";
import dbConnect from "@/app/lib/db_connection";

export async function GET(request) {
  await dbConnect();

  try {
    const messages = await messageModel.find({});

    return Response.json(
      {
        success: true,
        messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while fetching messages", error);

    return Response.json(
      {
        success: false,
        message: "Error while fetching messages",
      },
      { status: 500 }
    );
  }
}

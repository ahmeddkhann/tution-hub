import mongoose from "mongoose";
import messageModel from "@/app/models/message.models";
import dbConnect from "@/app/lib/db_connection";

export async function POST (request){

    await dbConnect()
    try {
        const {name, email, message} = await request.json()

        if (!name || !email || !message){
            return Response.json(
                {
                    status: false,
                    message: "please fill in all fields"
                },
                {status: 400}
            )
        }

        const newMessage = await messageModel.create({
            name,
            email,
            message,
          });

          await newMessage.save()
          return Response.json(
            {
              success: "true",
              message: "message sent successfully",
            },
            { status: 201 }
          );
        
    } catch (error) {
        console.log("Error while sending message", error);
        return Response.json(
            {
                success: false,
                message: "Error while sending message",
            },
            {status: 500}
        )
    }
}
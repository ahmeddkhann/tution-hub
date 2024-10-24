import dbConnect from "@/app/lib/db_connection";
import userModel from "@/app/models/user.models";

export async function POST (request){
    await dbConnect()
    try {

        const {name, email, username, password, gender, phone} = await request.json()

        if (!name || !email || !username || !password || !gender || phone){
            return Response.json(
                {
                    success: false,
                    message: "Please fill all the fields"
                },
                {status: 400}
            )
        }

        const usedUsername = await userModel.findOne((username))
        if (usedUsername){
            return Response.json(
                {
                    success: false,
                    message: `username ${username} already exists`
                },
                {status: 401}
            )
        }

        const usedEmail = await userModel.findOne((email))
        if (usedEmail){
            return Response.json(
                {
                    success: false,
                    message: `email ${email} already exists`
                },
                {status: 401}
            )
        }

        const newUser = await userModel.create({
            name,
            email,
            password,
            username,
            gender,
            phone
        })

        await newUser.save()

        return Response.json(
            {
                success: true,
                message: `User with username ${username} and email ${email} is created successfully`,
            },
            {status: 200}
        )
    } catch (error) {
        console.log("error while signing up user", error);
        
    }
}
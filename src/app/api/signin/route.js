import userModel from "@/app/models/user.models";
import dbConnect from "@/app/lib/db_connection";
import bcrypt from "bcrypt";

export async function POST(request) {
    await dbConnect();
    try {
        const { email, username, password } = await request.json();

        if (!email || !username || !password) {
            return Response.json(
                {
                    success: false,
                    message: "Please fill in all fields",
                },
                { status: 400 }
            );
        }

        const user = await userModel.findOne({ email, username }).select("+password");

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User with the provided email or username does not exist",
                },
                { status: 401 }
            );
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return Response.json(
                {
                    success: false,
                    message: "Incorrect password",
                },
                { status: 403 }
            );
        }

        return Response.json(
            {
                success: true,
                message: `User with username ${username} signed in successfully`,
            },
            { status: 200 }
        );

    } catch (error) {
        console.log("Error while signing in user", error);

        return Response.json(
            {
                success: false,
                message: "Error while signing in user",
            },
            { status: 500 }
        );
    }
}

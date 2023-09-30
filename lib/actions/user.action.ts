"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userParams: any) {
  try {
    connectToDatabase();

    const newUser = await User.create(userParams);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: {
  clerkId: string;
  updateData: any;
  path: string;
}) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findByIdAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: { clerkId: string }) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // delete everything that user have ever done (questions,answers ...):

    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //  "_id"
    // );

    // delete user questions:

    await Question.deleteMany({ author: user._id });

    // TODO: delte user answers...

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

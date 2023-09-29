"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import { createQuestionParams, getQuestionsParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: getQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .sort({
        createdAt: -1,
      });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: createQuestionParams) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // Create tags or get them if already exists:

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInsert: {
            name: tag,
          },
          $push: {
            questions: question._id,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: {
        tags: {
          $each: tagDocuments,
        },
      },
    });

    // Create an interaction record for user's ask_question action:

    // +5 points for author creating a question:

    revalidatePath(path);
  } catch (error) {}
}

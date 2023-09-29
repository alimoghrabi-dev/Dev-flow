import Link from "next/link";
import Image from "next/image";
import RenderTag from "./RenderTag";

const hotQuestions = [
  {
    _id: 1,
    title: "What is the difference between javascript and typescript?",
  },
  {
    _id: 2,
    title: "What is the difference between javascript and typescript?",
  },
  {
    _id: 3,
    title: "What is the difference between javascript and typescript?",
  },
  {
    _id: 4,
    title: "What is the difference between javascript and typescript?",
  },
];

const popularTags = [
  {
    _id: "1",
    name: "javascript",
    totalQuestion: 5,
  },
  {
    _id: "2",
    name: "react",
    totalQuestion: 55,
  },
  {
    _id: "3",
    name: "next",
    totalQuestion: 25,
  },
  {
    _id: "4",
    name: "vue",
    totalQuestion: 45,
  },
  {
    _id: "5",
    name: "redux",
    totalQuestion: 15,
  },
];

const RightSideBar = () => {
  return (
    <section className="background-light900_dark200 custom-scrollbar sticky right-0 top-0 flex h-screen flex-col items-center overflow-y-auto border-l border-gray-300 pt-36 shadow-light-300 dark:border-gray-800 dark:shadow-none max-xl:hidden">
      <div className="w-[90%]">
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/question/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-3.5">
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron-right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16 flex w-[90%] flex-col">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestion={tag.totalQuestion}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;

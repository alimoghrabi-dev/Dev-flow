import { Badge } from "@/components/ui/badge";
import { getTopInteractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import RenderTag from "../SideBar/RenderTag";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="w-full rounded-2xl shadow shadow-gray-300 dark:shadow-gray-800 max-xs:min-w-full xs:w-[260px]">
      <article className="background-light700_dark300 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt={user.username}
          width={190}
          height={190}
          className="h-[86px] w-[86px] rounded-full"
        />

        <div className="mt-5 text-center">
          <h3 className="h3-bold text-dark400_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>

        <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No tags yet.</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;

import dayjs from "dayjs";
import Link from "next/link";
import { RouterOutputs } from "~/utils/api";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type PostWithAuthor = RouterOutputs["post"]["getAll"][number];
const PostView = (props: PostWithAuthor) => {
  const { post, author } = props;
  return (
    <div className="flex gap-3 border-b border-slate-400 p-4" key={post.id}>
      <img
        src={author.imageUrl}
        alt={`@${author.username}'S profile picture`}
        className="h-14 w-14 rounded-full"
      />
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <Link href={`/@${author.username}`}>
            <span>{`@${author.username} `}</span>
          </Link>
          <Link href={`/post/${post.id}`}>
            <span className="font-thin">{`- ${dayjs(
              post.createdAt,
            ).fromNow()}`}</span>
          </Link>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
};

export default PostView;

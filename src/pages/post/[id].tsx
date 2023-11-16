import Head from "next/head";
import { api } from "~/utils/api";
import type { GetStaticProps, NextPage } from "next";
import { PageLayout } from "~/components/layout";
import PostView from "~/components/postview";
import { generateServerSideHelper } from "~/server/helpers/serverHelper";

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.post.getById.useQuery({
    id,
  });
  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - @${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateServerSideHelper();
  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  await ssg.post.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;

import Head from "next/head";
import { appRouter } from "~/server/api/root";
import { api } from "~/utils/api";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { db } from "~/server/db";
import superjson from "superjson";
import type { GetStaticProps, NextPage } from "next";
import { PageLayout } from "~/components/layout";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });
  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <PageLayout>
        <div>{data.username}</div>
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { db, auth: null as any },
    transformer: superjson,
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug.replace("@", "");

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;

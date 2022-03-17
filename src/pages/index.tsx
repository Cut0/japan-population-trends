import type { NextPage, GetStaticPropsResult } from "next";
import Head from "next/head";
import { GetAllPrefectures, Prefecture } from "../../api-client";
import { PageLayout } from "../components/layout/PageLayout";
import { HomeContent } from "../components/content/Index";

type HomeProps = {
  prefectures: Prefecture[];
};

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<HomeProps>
> => {
  const prefectures = await new GetAllPrefectures().handler();

  return {
    props: {
      prefectures,
    },
  };
};

const Home: NextPage<HomeProps> = ({ prefectures }) => {
  return (
    <>
      <Head>
        <title>日本の人口推移</title>
        <meta
          content="日本の各都道府県の人口推移をグラフで表現したアプリケーションです"
          name="description"
        />
        <link href="/favicon.ico" rel="icon"></link>
      </Head>
      <PageLayout>
        <HomeContent prefectures={prefectures}></HomeContent>
      </PageLayout>
    </>
  );
};

export default Home;

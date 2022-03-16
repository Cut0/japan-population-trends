import type { NextPage, GetStaticPropsResult } from "next";
import { getAllPrefectures, Prefecture } from "../../api-client";
import { PageLayout } from "../components/layout/PageLayout";
import { HomeContent } from "../components/content/Index";

type HomeProps = {
  prefectures: Prefecture[];
};

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<HomeProps>
> => {
  const prefectures = await new getAllPrefectures().handler();

  return {
    props: {
      prefectures,
    },
  };
};

const Home: NextPage<HomeProps> = ({ prefectures }) => {
  return (
    <PageLayout>
      <HomeContent prefectures={prefectures}></HomeContent>
    </PageLayout>
  );
};

export default Home;

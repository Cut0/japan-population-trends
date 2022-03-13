import type { NextPage, GetStaticPropsResult } from "next";
import { getAllPrefectures, Prefecture } from "../api-client";
import { CheckboxGroup } from "../components/common/CheckboxGroup";

type HomeProps = {
  prefectures: Prefecture[];
};

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<HomeProps>
> => {
  const prefectures = await getAllPrefectures().handler();

  return {
    props: {
      prefectures,
    },
  };
};

const Home: NextPage<HomeProps> = ({ prefectures }) => {
  return (
    <>
      <CheckboxGroup
        labelTitles={prefectures.map((prefecture) => prefecture.prefName)}
        onChange={(checkList) => {}}
      />
    </>
  );
};

export default Home;

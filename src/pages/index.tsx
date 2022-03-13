import type { NextPage, GetStaticPropsResult } from "next";
import { getAllPrefectures, Prefecture } from "../api-client";
import { CheckboxGroup } from "../components/common/CheckboxGroup";
import { usePopulationTrends } from "../hooks/populationTrendsHooks";

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
  const { data, error, loading, fetchPopulationTrends } = usePopulationTrends();
  return (
    <>
      <CheckboxGroup
        labelTitles={prefectures.map((prefecture) => prefecture.prefName)}
        onChange={(checkList) => {
          const checkedPrefectures = checkList
            .map((checked, index) => {
              if (checked) return prefectures[index];
            })
            .filter((el): el is NonNullable<typeof el> => Boolean(el));
          fetchPopulationTrends(checkedPrefectures);
        }}
      />
    </>
  );
};

export default Home;

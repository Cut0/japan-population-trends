import { initializeAxios } from "../plugins/axios";
import { Prefecture, TotalPopulation, TotalPopulationData } from "./types";
import { PopulationResponse } from ".";

const GET_POPULATION_TRENDS_URL = "/population/composition/perYear";

export const getPopulationTrends = () => {
  return {
    key: GET_POPULATION_TRENDS_URL,
    handler: async (
      prefectureList: Prefecture[],
    ): Promise<TotalPopulationData[]> => {
      const requests = prefectureList
        .map((prefecture) => prefecture.prefCode)
        .map((code) => {
          return async () => {
            const totalPopulation = await initializeAxios()
              .get<PopulationResponse>(GET_POPULATION_TRENDS_URL, {
                params: {
                  prefCode: code,
                },
              })
              .then((response) => {
                const totalPopulation = response.data.result.data.find(
                  (el) => el.label === "総人口",
                ) as TotalPopulation;

                return totalPopulation.data.filter(
                  (el) => el.year <= response.data.result.boundaryYear,
                );
              });
            return totalPopulation;
          };
        });

      const totalPopulationList = await Promise.all(
        requests.map((request) => request()),
      );
      return totalPopulationList;
    },
  };
};

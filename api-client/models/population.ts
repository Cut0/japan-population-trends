import { initializeAxios } from "../plugins/axios";
import { mockTotatlPopulation } from "../../mock-api-client";
import { Prefecture, TotalPopulation, TotalPopulationResponse } from "./types";
import { PopulationResponse } from ".";

const GET_POPULATION_TRENDS_URL = "/population/composition/perYear";

export class GetPopulationTrends {
  key = GET_POPULATION_TRENDS_URL;
  async handler(prefectureList: Prefecture[]): Promise<TotalPopulation[]> {
    const requests = prefectureList
      .map((prefecture) => prefecture.prefCode)
      .map((code) => {
        if (process.env.NODE_ENV === "development") {
          return () => Promise.resolve(mockTotatlPopulation[code - 1]);
        }
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
              ) as TotalPopulationResponse;

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
    return totalPopulationList.map((el, index) => {
      return { data: el, prefecture: prefectureList[index] };
    });
  }
}

import { initializeAxios } from "../plugins/axios";
import { mockTotatlPopulation } from "../../mock-api-client";
import { Prefecture, TotalPopulation, TotalPopulationResponse } from "./types";
import { PopulationResponse, TotalPopulationDataElement } from ".";

const GET_POPULATION_TRENDS_URL = "/population/composition/perYear";

export class getPopulationTrends {
  key = GET_POPULATION_TRENDS_URL;
  async handler(prefectureList: Prefecture[]): Promise<TotalPopulation[]> {
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
              if (process.env.NODE_ENV === "development") {
                // mswが要求するnodeのバージョンがvercelに存在しないため、一時的にmswを利用しない方針にする。
                // return response.data as unknown as TotalPopulationDataElement[];
                return mockTotatlPopulation[code - 1];
              }
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

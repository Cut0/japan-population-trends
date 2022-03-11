import { initializeAxios } from "../plugins/axios";
import { Prefecture, PrefecturesResponse } from ".";

const GET_All_PREFECTURES_URL = "/prefectures";

export const getAllPrefectures = () => {
  return {
    key: GET_All_PREFECTURES_URL,
    handler: async (): Promise<Prefecture[]> => {
      const prefectureList = await initializeAxios()
        .get<PrefecturesResponse>(GET_All_PREFECTURES_URL)
        .then((response) => {
          return response.data.result;
        });
      return prefectureList;
    },
  };
};

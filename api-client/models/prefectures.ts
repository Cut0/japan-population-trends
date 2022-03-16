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
          if (process.env.NODE_ENV === "development") {
            /**
             * MSWに渡すためresponse.dataに設定
             */
            return response.data as unknown as Prefecture[];
          }
          return response.data.result;
        });
      return prefectureList;
    },
  };
};

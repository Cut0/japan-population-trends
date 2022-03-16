import { initializeAxios } from "../plugins/axios";
import { Prefecture, PrefecturesResponse } from ".";

const GET_All_PREFECTURES_URL = "/prefectures";

export class getAllPrefectures {
  key = GET_All_PREFECTURES_URL;
  async handler(): Promise<Prefecture[]> {
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
  }
}

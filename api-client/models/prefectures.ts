import { initializeAxios } from "../plugins/axios";
import { mockAllPrefecture } from "../../mock-api-client";
import { Prefecture, PrefecturesResponse } from ".";

const GET_All_PREFECTURES_URL = "/prefectures";

export class getAllPrefectures {
  key = GET_All_PREFECTURES_URL;
  async handler(): Promise<Prefecture[]> {
    const prefectureList = await initializeAxios()
      .get<PrefecturesResponse>(GET_All_PREFECTURES_URL)
      .then((response) => {
        if (process.env.NODE_ENV === "development") {
          // mswが要求するnodeのバージョンがvercelに存在しないため、一時的にmswを利用しない方針にする。
          // return response.data as unknown as Prefecture[];
          return mockAllPrefecture;
        }
        return response.data.result;
      });
    return prefectureList;
  }
}

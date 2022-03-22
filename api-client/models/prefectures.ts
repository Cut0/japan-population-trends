import { initializeAxios } from "../plugins/axios";
import { mockAllPrefecture } from "../../mock-api-client";
import { Prefecture, PrefecturesResponse } from ".";

const GET_All_PREFECTURES_URL = "/prefectures";

export class GetAllPrefectures {
  key = GET_All_PREFECTURES_URL;
  async handler(): Promise<Prefecture[]> {
    if (process.env.NODE_ENV === "development") {
      return mockAllPrefecture;
    }
    const prefectureList = await initializeAxios()
      .get<PrefecturesResponse>(GET_All_PREFECTURES_URL)
      .then((response) => {
        return response.data.result;
      });
    return prefectureList;
  }
}

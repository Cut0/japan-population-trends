import { ResasResponse } from "../types";

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefecturesResponse = ResasResponse<Prefecture[]>;

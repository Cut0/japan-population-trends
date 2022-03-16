import { ResasResponse } from "../types";

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefecturesResponse = ResasResponse<Prefecture[]>;

export type TotalPopulationDataElement = { year: number; value: number };

export type TotalPopulation = {
  prefecture: Prefecture;
  data: TotalPopulationDataElement[];
};

export type TotalPopulationResponse = {
  label: "総人口";
  data: { year: number; value: number }[];
};

export type YoungerPopulationResponse = {
  label: "年少人口";
  data: { year: number; value: number; rate: number }[];
};

export type WorkingAgePopulationResponse = {
  label: "生産年齢人口";
  data: { year: number; value: number; rate: number }[];
};

export type ElderlyPopulationResponse = {
  label: "老年人口";
  data: { year: number; value: number; rate: number }[];
};

export type PopulationResponse = ResasResponse<{
  boundaryYear: number;
  data: [
    TotalPopulationResponse,
    YoungerPopulationResponse,
    WorkingAgePopulationResponse,
    ElderlyPopulationResponse,
  ];
}>;

import { ResasResponse } from "../types";

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefecturesResponse = ResasResponse<Prefecture[]>;

export type TotalPopulation = {
  label: "総人口";
  data: { year: number; value: number }[];
};

export type TotalPopulationData = { year: number; value: number }[];

export type YoungerPopulation = {
  label: "年少人口";
  data: { year: number; value: number; rate: number }[];
};

export type WorkingAgePopulation = {
  label: "生産年齢人口";
  data: { year: number; value: number; rate: number }[];
};

export type ElderlyPopulation = {
  label: "老年人口";
  data: { year: number; value: number; rate: number }[];
};

export type PopulationResponse = ResasResponse<{
  boundaryYear: number;
  data: [
    TotalPopulation,
    YoungerPopulation,
    WorkingAgePopulation,
    ElderlyPopulation,
  ];
}>;

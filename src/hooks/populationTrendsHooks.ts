import { useCallback } from "react";
import useSWR from "swr";
import {
  getPopulationTrends,
  Prefecture,
  TotalPopulationData,
} from "../api-client";

export const usePopulationTrends = () => {
  const { key, handler } = getPopulationTrends();
  const { data, error, mutate } = useSWR<TotalPopulationData[], Error>(key);

  const fetchPopulationTrends = useCallback(
    (prefectureList: Prefecture[]) => {
      mutate(async () => {
        const populationTrends = await handler(prefectureList);
        return populationTrends;
      });
    },
    [mutate, handler],
  );

  return {
    data,
    error,
    loading: !data && !error,
    fetchPopulationTrends,
  };
};

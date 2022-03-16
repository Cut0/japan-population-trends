import { useCallback } from "react";
import useSWR from "swr";
import {
  getPopulationTrends,
  Prefecture,
  TotalPopulation,
} from "../../api-client";
import { handleApiError } from "../utils/error";

export const usePopulationTrends = () => {
  const { key, handler } = new getPopulationTrends();
  const { data, error, mutate } = useSWR<TotalPopulation[], Error>(key);

  const fetchPopulationTrends = useCallback(
    (prefectureList: Prefecture[]) =>
      mutate(async () => {
        const populationTrends = await handler(prefectureList);
        return populationTrends;
      }).catch(handleApiError),
    [mutate, handler],
  );

  return {
    data,
    error,
    loading: !data && !error,
    fetchPopulationTrends,
  };
};

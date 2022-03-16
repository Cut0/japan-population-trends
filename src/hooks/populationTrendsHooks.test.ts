import { act, renderHook } from "@testing-library/react-hooks";
import { getPopulationTrends, TotalPopulation } from "../../api-client";
import { SwrTestWrapper } from "../components/SwrTestWrapper";
import { usePopulationTrends } from "./populationTrendsHooks";

test("初期状態", async () => {
  const { result } = renderHook(() => usePopulationTrends(), {
    wrapper: SwrTestWrapper,
  });

  expect(result.current).toEqual({
    data: undefined,
    error: undefined,
    loading: true,
    fetchPopulationTrends: expect.any(Function),
  });
});

test("データ取得成功", async () => {
  const totalPopulationData: TotalPopulation[] = [
    {
      prefecture: { prefCode: 1, prefName: "北海道" },
      data: [
        {
          year: 1960,
          value: 5039206,
        },
        {
          year: 1965,
          value: 5171800,
        },
        {
          year: 1970,
          value: 5184287,
        },
        {
          year: 1975,
          value: 5338206,
        },
        {
          year: 1980,
          value: 5575989,
        },
        {
          year: 1985,
          value: 5679439,
        },
        {
          year: 1990,
          value: 5643647,
        },
        {
          year: 1995,
          value: 5692321,
        },
        {
          year: 2000,
          value: 5683062,
        },
        {
          year: 2005,
          value: 5627737,
        },
        {
          year: 2010,
          value: 5506419,
        },
        {
          year: 2015,
          value: 5381733,
        },
      ],
    },
    {
      prefecture: { prefCode: 2, prefName: "青森県" },
      data: [
        {
          year: 1960,
          value: 1426606,
        },
        {
          year: 1965,
          value: 1416591,
        },
        {
          year: 1970,
          value: 1427520,
        },
        {
          year: 1975,
          value: 1468646,
        },
        {
          year: 1980,
          value: 1523907,
        },
        {
          year: 1985,
          value: 1524448,
        },
        {
          year: 1990,
          value: 1482873,
        },
        {
          year: 1995,
          value: 1481663,
        },
        {
          year: 2000,
          value: 1475728,
        },
        {
          year: 2005,
          value: 1436657,
        },
        {
          year: 2010,
          value: 1373339,
        },
        {
          year: 2015,
          value: 1308265,
        },
      ],
    },
  ];

  jest
    .spyOn(getPopulationTrends.prototype, "handler")
    .mockResolvedValue(totalPopulationData);

  const { result } = renderHook(() => usePopulationTrends(), {
    wrapper: SwrTestWrapper,
  });

  await act(async () => {
    await result.current.fetchPopulationTrends([
      { prefCode: 1, prefName: "北海道" },
      { prefCode: 2, prefName: "青森県" },
    ]);
  });

  expect(result.current).toEqual({
    data: totalPopulationData,
    error: undefined,
    loading: false,
    fetchPopulationTrends: expect.any(Function),
  });
});

test("失敗時", async () => {
  jest
    .spyOn(getPopulationTrends.prototype, "handler")
    .mockRejectedValue(new Error());

  const { result } = renderHook(() => usePopulationTrends(), {
    wrapper: SwrTestWrapper,
  });

  await act(async () => {
    await result.current.fetchPopulationTrends([
      { prefCode: 1, prefName: "北海道" },
      { prefCode: 2, prefName: "青森県" },
    ]);
  });

  expect(result.current).toEqual({
    data: undefined,
    error: new Error(),
    loading: false,
    fetchPopulationTrends: expect.any(Function),
  });
});

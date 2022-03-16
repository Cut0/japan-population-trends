import type { VFC } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Legend,
} from "recharts";
import { Prefecture } from "../../../api-client";
import { CheckboxGroup } from "../common/CheckboxGroup";
import { usePopulationTrends } from "../../hooks/populationTrendsHooks";
import { numberToColorCode } from "../../utils/color";
import { checkBoxGroupContainer, chartContainer } from "./index.css";

type HomeContentProps = {
  prefectures: Prefecture[];
};

export const HomeContent: VFC<HomeContentProps> = ({ prefectures }) => {
  const { data, fetchPopulationTrends } = usePopulationTrends();

  return (
    <>
      <div className={checkBoxGroupContainer}>
        <CheckboxGroup
          labelTitles={prefectures.map((prefecture) => prefecture.prefName)}
          onChange={(checkList) => {
            const checkedPrefectures = checkList
              .map((checked, index) => {
                if (checked) return prefectures[index];
              })
              .filter((el): el is NonNullable<typeof el> => Boolean(el));
            fetchPopulationTrends(checkedPrefectures);
          }}
        />
      </div>
      <div className={chartContainer}>
        <ResponsiveContainer height={400} width="100%">
          <LineChart margin={{ top: 0, right: 0, left: 12, bottom: 30 }}>
            <Legend align="right" layout="horizontal" verticalAlign="bottom" />
            <XAxis
              dataKey="year"
              domain={[1960, 2020]}
              tickFormatter={(val) => `${val}年`}
              type="number"
            />
            <YAxis tickFormatter={(val) => `${val}万人`} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {data &&
              data
                .map((list) => {
                  return {
                    ...list,
                    data: list.data.map((el) => {
                      return { ...el, value: el.value / 10000 };
                    }),
                  };
                })
                .map((list, index) => {
                  return (
                    <Line
                      activeDot={{ r: 8 }}
                      data={list.data}
                      dataKey="value"
                      key={index}
                      name={list.prefecture.prefName}
                      stroke={numberToColorCode(
                        list.prefecture.prefCode / prefectures.length,
                      )}
                      type="monotone"
                    />
                  );
                })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

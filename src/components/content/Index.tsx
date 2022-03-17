import { useState, VFC } from "react";
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
import { ErrorToast } from "../common/ErrorToast";
import {
  errorToastContainer,
  checkBoxGroupContainer,
  chartContainer,
} from "./index.css";

type HomeContentProps = {
  prefectures: Prefecture[];
};

export const HomeContent: VFC<HomeContentProps> = ({ prefectures }) => {
  const { totalPopulationList, fetchPopulationTrends } = usePopulationTrends();
  const [showErrorToast, setShowErrorToast] = useState(false);

  return (
    <>
      {showErrorToast && (
        <div className={errorToastContainer}>
          <ErrorToast
            closeHandler={() => setShowErrorToast(false)}
            message="データ取得時にエラーが発生しました。"
          />
        </div>
      )}
      <div className={checkBoxGroupContainer}>
        <CheckboxGroup
          labelTitles={prefectures.map((prefecture) => prefecture.prefName)}
          onChange={(checkList) => {
            const checkedPrefectures = checkList
              .map((checked, index) => {
                if (checked) return prefectures[index];
              })
              .filter((el): el is NonNullable<typeof el> => Boolean(el));
            fetchPopulationTrends(checkedPrefectures).then((res) => {
              if (res instanceof Error) {
                setShowErrorToast(true);
              }
            });
          }}
        />
      </div>
      <div className={chartContainer}>
        <ResponsiveContainer height={400} width="100%">
          <LineChart margin={{ top: 0, right: 0, left: 12, bottom: 30 }}>
            <Legend
              align="right"
              height={32}
              layout="horizontal"
              verticalAlign="bottom"
            />
            <XAxis
              dataKey="year"
              domain={[1960, 2020]}
              tickFormatter={(val) => `${val}年`}
              type="number"
            />
            <YAxis tickFormatter={(val) => `${val}万人`} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {totalPopulationList &&
              totalPopulationList
                .map((totalPopulationByPrefecture) => {
                  return {
                    ...totalPopulationByPrefecture,
                    data: totalPopulationByPrefecture.data.map((el) => {
                      return { ...el, value: el.value / 10000 };
                    }),
                  };
                })
                .map((totalPopulationByPrefecture, index) => {
                  return (
                    <Line
                      activeDot={{ r: 8 }}
                      data={totalPopulationByPrefecture.data}
                      dataKey="value"
                      key={index}
                      name={totalPopulationByPrefecture.prefecture.prefName}
                      stroke={numberToColorCode(
                        totalPopulationByPrefecture.prefecture.prefCode /
                          prefectures.length,
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

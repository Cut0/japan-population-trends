import { rest, MockedRequest, ResponseResolver, restContext } from "msw";
import { getPopulationTrends } from "../../api-client";
import { totalPopulationData } from "../testdata/population";

const mockGetPopulationTrends: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  const prefCode = Number(req.url.searchParams.get("prefCode"));
  return res(ctx.status(200), ctx.json(totalPopulationData[prefCode - 1]));
};

export const populationTrendsHandlers = [
  rest.get(getPopulationTrends().key, mockGetPopulationTrends),
];

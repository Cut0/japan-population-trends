import { rest, MockedRequest, ResponseResolver, restContext } from "msw";
import { getAllPrefectures } from "../../api-client";
import { allPrefecture } from "../testdata/prefecture";

const mockGetAllPrefectures: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(allPrefecture));
};

export const allPrefecturesHandlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_END_POINT}${getAllPrefectures().key}`,
    mockGetAllPrefectures,
  ),
];

import { setupWorker } from "msw";
import { setupServer } from "msw/node";
import { allPrefecturesHandlers, populationTrendsHandlers } from "./models";

export const initializeMock = () => {
  if (typeof window === "undefined") {
    const server = setupServer(
      ...allPrefecturesHandlers,
      ...populationTrendsHandlers,
    );
    server.listen();
  } else {
    const worker = setupWorker(
      ...allPrefecturesHandlers,
      ...populationTrendsHandlers,
    );
    worker.start();
  }
};

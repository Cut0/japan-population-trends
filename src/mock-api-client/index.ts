import { setupWorker } from "msw";
import { setupServer } from "msw/node";
import { allPrefecturesHandlers } from "./models";

export const initializeMock = () => {
  if (typeof window === "undefined") {
    const server = setupServer(...allPrefecturesHandlers);
    server.listen();
  } else {
    const worker = setupWorker(...allPrefecturesHandlers);
    worker.start();
  }
};

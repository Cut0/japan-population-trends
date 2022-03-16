import { PropsWithChildren, VFC } from "react";
import { pageContainer, pageContent } from "./PageLayout.css";

export const PageLayout: VFC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className={pageContainer}>
      <div className={pageContent}>{children}</div>
    </div>
  );
};

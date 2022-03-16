import { PropsWithChildren, VFC } from "react";
import { Header } from "../common/Header";
import { pageContainer, pageContent } from "./PageLayout.css";

export const PageLayout: VFC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Header title="人口分布" />
      <div className={pageContainer}>
        <div className={pageContent}>{children}</div>
      </div>
    </>
  );
};

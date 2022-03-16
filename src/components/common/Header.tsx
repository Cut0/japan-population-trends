import { VFC } from "react";
import { header } from "./Header.css";

type HeaderProps = { title: string };

export const Header: VFC<HeaderProps> = ({ title }) => {
  return <header className={header}>{title}</header>;
};

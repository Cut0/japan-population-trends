import { style, globalStyle } from "@vanilla-extract/css";

export const tagContainer = style({
  display: "inline-block",
  padding: "2px",
});

export const label = style({
  display: "inline-block",
  cursor: "pointer",
  borderRadius: "16px",
  border: "1px solid #606060",
  padding: "2px 8px",
  color: "#606060",
});

export const checkbox = style({
  display: "none",
});

/**
 * vanilla-extract では子要素にアクセスできないため定義。
 * ${label}を使用しているため、大きな影響を与えるわけではない。
 */
globalStyle(`input[type="checkbox"]:checked + ${label}`, {
  backgroundColor: "#A0A0A0",
});

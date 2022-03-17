import { style } from "@vanilla-extract/css";

export const header = style({
  fontWeight: "bold",
  position: "fixed",
  backgroundColor: "#008830",
  color: "white",
  width: "100%",
  padding: "16px",
  zIndex: 1,
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)",
});

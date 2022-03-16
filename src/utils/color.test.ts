import { numberToColorCode } from "./color";

describe(numberToColorCode.name, () => {
  test("0の時、黒になる", () => {
    expect(numberToColorCode(0)).toBe("#000000");
  });
  test("1の時、青(最大値)になる", () => {
    expect(numberToColorCode(1)).toBe("#7fffff");
  });
});

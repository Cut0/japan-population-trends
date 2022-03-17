import { VFC, useRef } from "react";
import { tagContainer, checkbox, label } from "./CheckboxGroup.css";

type CheckboxGroupProps = {
  labelTitles: string[];
  onChange: (checkList: boolean[]) => void;
};

export const CheckboxGroup: VFC<CheckboxGroupProps> = ({
  labelTitles,
  onChange,
}) => {
  /**
   * 再レンダリング抑制のため、useRefで管理する。
   */
  const checkList = useRef<boolean[]>(labelTitles.map(() => false));
  return (
    <>
      {labelTitles.map((title, index) => {
        return (
          <div className={tagContainer} key={index}>
            <input
              className={checkbox}
              id={`${index}`}
              type="checkbox"
              onChange={(e) => {
                checkList.current[index] = e.target.checked;
                onChange(checkList.current);
              }}
            />
            <label className={label} htmlFor={`${index}`}>
              {title}
            </label>
          </div>
        );
      })}
    </>
  );
};

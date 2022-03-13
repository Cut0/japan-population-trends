import { VFC, useRef } from "react";

type CheckboxGroupProps = {
  labelTitles: string[];
  onChange: (checkList: boolean[]) => void;
};

export const CheckboxGroup: VFC<CheckboxGroupProps> = ({
  labelTitles,
  onChange,
}) => {
  const checkList = useRef<boolean[]>(labelTitles.map(() => false));
  return (
    <>
      {labelTitles.map((title, index) => {
        return (
          <label key={index}>
            <input
              type="checkbox"
              onChange={(e) => {
                checkList.current[index] = e.target.checked;
                onChange(checkList.current);
              }}
            />
            {title}
          </label>
        );
      })}
    </>
  );
};

import { useEffect, useState } from "react";
import { NodeType } from "../utils/types";
import { useOverflowScreenBottom } from "./useOverflowScreenBottom";
import cx from "classnames";
import styles from "./CommandPanel.module.css";

type CommandPanelProps = {
  nodeText: string;
  selectItem: (nodeType: NodeType) => void;
};

type SupportedNodeType = {
  value: NodeType;
  name: string;
};

const supportedNodeType: SupportedNodeType[] = [
  { value: "text", name: "Text" },
  { value: "list", name: "Text" },
  { value: "heading1", name: "Heading 1" },
  { value: "heading2", name: "Heading 2" },
  { value: "heading3", name: "Heading3" },
];

export const CommandPanel = ({ selectItem, nodeText }: CommandPanelProps) => {
  const [selectItemIndex, setSelectItemIndex] = useState(0);
  const { overflows, ref } = useOverflowScreenBottom();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        selectItem(supportedNodeType[selectItemIndex].value);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectItemIndex, selectItem]);

  useEffect(() => {
    const normalizedValue = nodeText.toLocaleLowerCase().replace(/\//, "");
    setSelectItemIndex(
      supportedNodeType.findIndex((item) => item.value.match(normalizedValue))
    );
  }, [nodeText]);
  return (
    <div
      ref={ref}
      className={cx(styles.panel, {
        [styles.reverse]: overflows,
      })}
    >
      <div className={styles.title}>Block</div>
      <ul>
        {supportedNodeType.map((type, index) => {
          const selected = selectItemIndex === index;

          return (
            <li
              key={type.value}
              className={cx({ [styles.selected]: selected })}
              onClick={() => selectItem(type.value)}
            >
              {type.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

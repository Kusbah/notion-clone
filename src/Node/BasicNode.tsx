import {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from "react";
import { NodeData } from "../utils/types";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";

type BasicNodeProps = {
  node: NodeData;
  updateFocuesedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

export const BasicNode = ({
  node,
  updateFocuesedIndex,
  isFocused,
  index,
}: BasicNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const { changeNodeValue, removeNodeByIndex, addNode } = useAppState();

  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);
  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node]);
  const handleInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    const { textContent } = currentTarget;
    changeNodeValue(index, textContent || "");
  };
  const handleClick = () => {
    updateFocuesedIndex(index);
  };
  const onKetDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;
    if (event.key === "Enter") {
      event.preventDefault();
      if (target.textContent?.[0] === "/") {
        return;
      }
      addNode({ type: node.type, value: "", id: nanoid() }, index + 1);
      updateFocuesedIndex(index + 1);
    }
    if (event.key === "Backspace") {
      if (target.textContent?.length === 0) {
        event.preventDefault();
        removeNodeByIndex(index);
        updateFocuesedIndex(index - 1);
      } else if (window?.getSelection()?.anchorOffset === 0) {
        event.preventDefault();
        removeNodeByIndex(index - 1);
        updateFocuesedIndex(index - 1);
      }
    }
  };
  return (
    <div
      onKeyDown={onKetDown}
      onClick={handleClick}
      onInput={handleInput}
      ref={nodeRef}
      contentEditable
      suppressContentEditableWarning
    />
  );
};

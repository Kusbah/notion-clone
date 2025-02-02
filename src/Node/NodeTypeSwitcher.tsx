import { NodeData, NodeType } from "../utils/types";
import { BasicNode } from "./BasicNode";

type NodeTypeSwitcherProps = {
  node: NodeData;
  updateFocuesedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

const TEXT_NODE_TYPES: NodeType[] = [
  "text",
  "list",
  "heading2",
  "heading2",
  "heading3",
];

export const NodeTypeSwitcher = ({
  node,
  isFocused,
  index,
  updateFocuesedIndex,
}: NodeTypeSwitcherProps) => {
  if (TEXT_NODE_TYPES.includes(node.type)) {
    return (
      <BasicNode
        node={node}
        index={index}
        isFocused={isFocused}
        updateFocuesedIndex={updateFocuesedIndex}
      />
    );
  }
  return null;
};

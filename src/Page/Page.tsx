import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import { Cover } from "./Cover";
import { NodeTypeSwitcher } from "../Node/NodeTypeSwitcher";
import { Spacer } from "./Spacer";
import { Title } from "./Title";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";

export const Page = () => {
  const { title, nodes, addNode, setTitle } = useAppState();
  const [focusedNodeIndex, setFocsedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  return (
    <>
      <Cover />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />
        {nodes.map((node, index) => (
          <NodeTypeSwitcher
            key={node.id}
            node={node}
            isFocused={focusedNodeIndex == index}
            updateFocuesedIndex={setFocsedNodeIndex}
            index={index}
          />
        ))}
        <Spacer
          handleClick={() => {
            addNode({ type: "text", value: "", id: nanoid() }, nodes.length);
          }}
          showHint={!nodes.length}
        />
      </div>
    </>
  );
};

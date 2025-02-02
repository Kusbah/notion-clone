import { NodeData, NodeType, page } from "../utils/types";
import { useImmer } from "use-immer";

export const usePgaeState = (instialState: page) => {
  const [page, setPage] = useImmer<page>(instialState);
  const addNode = (node: NodeData, index: number) => {
    setPage((draft) => draft.node.splice(index, 0, node));
  };
  const removeNodeIndex = (nodeIndex: number) => {
    setPage((draft) => draft.node.splice(nodeIndex, 1));
  };
  const changeNodeValue = (nodeIndex: number, value: string) => {
    setPage((draft) => (draft.node[nodeIndex].value = value));
  };
  const changeNodeType = (nodeIndex: number, type: NodeType) => {
    setPage((draft) => {
      draft.node[nodeIndex].type = type;
      draft.node[nodeIndex].value = "";
    });
  };
  const setNode = (nodes: NodeData[]) => {
    setPage((draft) => {
      draft.node = nodes;
    });
  };
  const setTitle = (title: string) => {
    setPage((draft) => {
      draft.title = title;
    });
  };
  const setCoverImage = (coverimage: string) => {
    setPage((draft) => {
      draft.cover = coverimage;
    });
  };
  return {
    nodes: page.node,
    title: page.title,
    cover: page.cover,
    changeNodeType,
    changeNodeValue,
    addNode,
    removeNodeIndex,
    setTitle,
    setCoverImage,
    setNode,
  };
};

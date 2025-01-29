import { useState, Dispatch,SetStateAction, useEffect } from "react";
import { NodeData } from "../utils/types";

type UseFocusedNodeIndexProps = {
    node: NodeData[];
}

export const useFocusedNodeIndex = ({node}: UseFocusedNodeIndexProps) : [number,Dispatch<SetStateAction<number>> ] => {
    const [focusedNodeIndex,setFocusedNodeIndex] = useState(0);

    useEffect(()=>{
        const onKeyDown =(event: KeyboardEvent)=>{
            if(event.key==="ArrowUp"){
                setFocusedNodeIndex(index =>Math.max(index-1,0))
            }
            if(event.key==="ArrowDown"){
                setFocusedNodeIndex(index=>Math.min(index+1,node.length-1));
            }
        }
        document.addEventListener("keydown", onKeyDown)
        return() => document.removeEventListener("keydown",onKeyDown)
    })

    return[focusedNodeIndex, setFocusedNodeIndex]
}
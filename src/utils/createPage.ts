import { nanoid } from "nanoid";
import { page } from "./types";

export const creatPage = () =>{
  const slug = nanoid();
  const id = nanoid()

  const page: page = {
    title: "Untitled",
    id,
    slug,
    node: [],
    cover: "ztn-cover-png"
  }
  return page
}
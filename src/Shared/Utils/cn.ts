import { twMerge } from "tailwind-merge";
import {clsx} from "clsx"
const cn = (...props:any) => {
  return twMerge(clsx(...props))
}

export default cn
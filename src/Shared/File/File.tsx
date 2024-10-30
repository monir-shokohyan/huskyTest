import { ChangeEvent, useState } from "react"
import { FaFileAlt } from "react-icons/fa";
import { useClickOutside } from '@mantine/hooks'
import { useDirectory } from "../Context/DirectoryContext";
import { MdDelete } from "react-icons/md";


export const File=({name,active}:{name:string,active:boolean})=>{
    const [activeChangeFolder,setActiveChangeFolder]=useState(false);
    const {changeName,findActive,deleteDoc}=useDirectory()
    const ref=useClickOutside(()=>{
        setActiveChangeFolder(!activeChangeFolder);
        changeName(name,fileName)
        setFileName('');

    })
    const [fileName,setFileName]=useState('')

    const changeFileName=(e:ChangeEvent<HTMLInputElement>)=>{
        setFileName(e.target.value);
    }
    return (
        <div className={`flex justify-start pl-2 gap-2 items-center min-w-[120px] text-white w-full my-[1px] relative ${active && 'bg-blue-400'}`} onClick={()=>findActive(name)}  onDoubleClick={()=>setActiveChangeFolder(true)}>
            <FaFileAlt opacity={'100%'} className="w-[20px]"/>
           {activeChangeFolder? <input type="text"
            value={fileName}
            className="bg-[#575c65] text-white w-full rounded-sm h-[22px] pl-2 outline-none border-[1px] box-border border-white text-[clamp(.9rem,1vw,1.2rem)]"
            onChange={(e)=>changeFileName(e)} ref={ref} />

           : <span className="cursor-pointer text-[clamp(.9rem,1vw,1.2rem)] select-none" >{name.length>11 ? name.slice(0,9).concat('...'):name}</span>}
             <div className="absolute right-2 px-1 group " onClick={()=>deleteDoc(name)}>
                {
                !activeChangeFolder && <MdDelete className="opacity-50  group-hover:scale-110 group-hover:opacity-100 "/>
                }            
            </div>  
        </div>
    )
    }
    
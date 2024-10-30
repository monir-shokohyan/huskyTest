import { ChangeEvent, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { IsFolder } from "../IsFolder/IsFolder";
import { useClickOutside } from "@mantine/hooks";
import { useDirectory } from "../Context/DirectoryContext";
import { MdDelete } from "react-icons/md";


export const Folder=({name,active,childs}:{name:string,active:boolean,childs:any})=>{
    const [isActive,setIsActive]=useState(false);
    const [activeChangeFolder,setActiveChangeFolder]=useState(false);
    const {changeName,findActive,deleteDoc}=useDirectory()
    const ref=useClickOutside(()=>{
        setActiveChangeFolder(!activeChangeFolder);
        changeName(name,fileName);
        setFileName('');
        
    })
    const [fileName,setFileName]=useState('')
    

    const changeFileName=(e:ChangeEvent<HTMLInputElement>)=>{
        setFileName(e.target.value);
    }

    

return (
    <div className={`pl-2 py-[1px] `}>
        <div className={`flex justify-start gap-2 items-center text-white relative ${active  && 'bg-blue-400'}`} onClick={()=>{
            setIsActive(!isActive);
            setFileName(name)
            findActive(name);
            }}
             onDoubleClick={()=>setActiveChangeFolder(true)}>
            {isActive ? <IoIosArrowDown/>:<IoIosArrowForward/>}
           
            {activeChangeFolder? <input type="text" value={fileName} className="bg-[#575c65] text-white w-full rounded-sm h-[22px] pl-2 outline-none border-[1px] box-border border-white text-[clamp(.9rem,1vw,1.2rem)]" onChange={(e)=>changeFileName(e)} ref={ref} />
           : <span className="cursor-pointer text-[clamp(.9rem,1vw,1.2rem)] select-none" >{name.length>11 ? name.slice(0,9).concat('...'):name}</span>}
            <div className="absolute right-0 px-1 group " onClick={()=>deleteDoc(name)}>

                {!activeChangeFolder && <MdDelete className=" opacity-50  group-hover:scale-110 group-hover:opacity-100 "/>
                }            
            </div>
        </div>
{
    childs && isActive ?

   <IsFolder directory={childs}/>
    :''
}


    </div>
)
}
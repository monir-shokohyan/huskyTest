import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FiFilePlus } from "react-icons/fi";
import { animated, useSpring} from '@react-spring/web';
import {  useState } from "react";
import { IsFolder } from "../IsFolder/IsFolder";
import { useDirectory } from "../Context/DirectoryContext";
import { useClickOutside } from "@mantine/hooks";


const Sidebar = () => {
    const [show,setShow]=useState<{file:boolean,folder:boolean}>({
        file:false,
        folder:false,
    });
    const [folderCount,setFolderCount]=useState<number>(1)
    const [fileCount,setFileCount]=useState<number>(1)
    const {directory,createDoc,resetActive}=useDirectory()
    const styleFile=useSpring({
        opacity:show?.file ? 1 :0,
    });
    const ref=useClickOutside(()=>{
        resetActive();
    })
    const styleFolder=useSpring({
        opacity:show?.folder ? 1 :0,
    });


  return (
    <div className="w-1/6 h-screen bg-[#494d55] flex flex-col p-4 overflow-y-auto " >


        <div className="pt-10 " ref={ref}>
        <div className={`flex justify-end gap-1 items-center bg-[#494d55]  h-[50px] fixed w-1/6 top-0 left-0 border-b-[1px] border-gray-500 pr-2 z-[10]`}>
            <span className={` text-white hover:bg-gray-500  relative p-1 flex items-end rounded-md h-[35px] cursor-pointer${show.folder && 'hover:bg-gray-500'}`}  onClick={()=>{
                createDoc(`newFolder${folderCount}`,true);
                setFolderCount(prev=>prev+1)
                }}>
                <MdOutlineCreateNewFolder className="text-[20px]" onMouseEnter={()=>setShow({folder:false,file:true})} onMouseLeave={()=>setShow({folder:false,file:false})}/>

                    {show.file&& <animated.div style={styleFile}
                     className="absolute left-1/2 top-[38px] translate-x-[-50%] w-[120px] bg-[#31343a] p-2 rounded-md text-sm text-center z-30">
                     Create Folder
                     </animated.div>
                    }                
            </span>
            <span className={`pt-2  text-white hover:bg-gray-500 relative p-1 flex items-end rounded-md h-[35px]  cursor-pointer${show.file && 'hover:bg-gray-500'}`} onClick={()=>{
                createDoc(`newFile${fileCount}`,false);
                setFileCount(prev=>prev+1)
                
                }}>
                <FiFilePlus className="text-[18px]"  onMouseEnter={()=>setShow({file:false,folder:true})} onMouseLeave={()=>setShow({file:false,folder:false})}/>

                    { show.folder &&<animated.div style={styleFolder}
                     className="absolute left-1/2 top-[38px] translate-x-[-50%] w-[120px] bg-[#31343a] p-2 rounded-md text-sm text-center ">
                     Create File
                     </animated.div>
                    }  
          </span>
        </div>
          <IsFolder directory={directory}/>
        </div>

    </div>
  )
}

export default Sidebar;



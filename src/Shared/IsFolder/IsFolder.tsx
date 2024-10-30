import { File } from "../File/File"
import { Folder } from "../Folder/Folder"

export const IsFolder=({directory}:{directory:any})=>{


    return (
        <>
        
        {directory?.map((item:any,index:number)=>{
            return <div key={index}>
                  
                      {item.type ? <Folder name={item?.name} childs={item?.children ? item?.children :''} active={item?.active}/>:<File name={item.name} active={item.active}/>}
                  
                   </div>
          })}
        
        </>
        
    )
        
    
}
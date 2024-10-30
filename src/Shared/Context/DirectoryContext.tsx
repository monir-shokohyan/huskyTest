// DirectoryContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { defaultDirectory } from '../Sidebar';
// Define directory item type with optional children
export interface DirectoryItem {
    name: string;
    children?: DirectoryItem[];
    type:boolean;
    active:boolean;
}

interface DirectoryContextType {
    directory: DirectoryItem[];
    changeName: (prevName: string, newName: string) => void;
    findActive:(prevName:string)=>void;
    createDoc:(name:string,type:boolean)=>void;
    deleteDoc:(name:string)=>void;
    resetActive:()=>void;
}



// Create the context with a default value
const DirectoryContext = createContext<DirectoryContextType | undefined>(undefined);

interface DirectoryProviderProps {
    children: ReactNode;
}

// DirectoryProvider component with initial data loading and `changeName` function
export const DirectoryProvider: React.FC<DirectoryProviderProps> = ({ children }) => {
    const [directory, setDirectory] = useState<DirectoryItem[]>(() => {
        const stored = localStorage.getItem('Directory');
        return stored ? JSON.parse(stored) : defaultDirectory;
    });

    useEffect(() => {
        localStorage.setItem('Directory', JSON.stringify(directory));
    }, [directory]);


    //check for duplicates in item names    
    const checkDuplicate=(arr: DirectoryItem[],newName:string): boolean=>{
        const checkDuplicateVar=arr.some(item=>{
            if(item.name===newName){
                return true;
            }else if(item.children){
                checkDuplicate(item.children,newName)
            }else{
                return false;
            }
        })
            return checkDuplicateVar;
    }

    // changeName function to rename items within directory
    const changeName = (prevName: string, newName: string) => {
        if(!newName) return;
       
        const updateDirectory = (arr: DirectoryItem[]): DirectoryItem[] => {
            return arr.map(item => {
                const item2={...item,active:false}
                if (item?.name === prevName) {
                    return { ...item2, name: newName,active:true };
                } else if (item2.children) {
                    return { ...item2, children: updateDirectory(item2.children) };
                }
                return item2;
            });
        };
        setDirectory(prev => {
            return checkDuplicate(prev,newName) ? prev : updateDirectory(prev)
        });
    };


    //deactivate all active items
    const makeDeactive=(arr:DirectoryItem[]):DirectoryItem[]=>{
        const arr2=arr.map(item=>{
            if(item.active){
                return {...item,active:false};
            }else if(item.children){
                return {...item,children:makeDeactive(item.children)}
            }else{
                return item;
            }
        })
        return arr2;
    }


   

    //finds the item and make the active to true
    const findActive=(prevName:string)=>{

        if(!prevName) return  ;
        const doActive=(arr:DirectoryItem[],prevName:string):DirectoryItem[]=>{

            let arr2= makeDeactive(arr)
     
              arr2= arr2.map(item=>{
                 if(item.name===prevName){
                     return {...item,active:true}
                 }else if(item.children){
                     return {...item,children:doActive(item.children,prevName)}
                 }else{
                     return item;
                 }
             })
             return arr2;
        }

        setDirectory(prev=>doActive(prev,prevName))
    }



    //create folder inside the item
    const createDoc = (name:string,type:boolean) => {
        let checkEmpty=true;
        const doCreateFolder = (arr: DirectoryItem[]): DirectoryItem[] => {
            return arr.map(item => {
                if (item.active === true) {
                    item.children = item.children || [];
                    checkEmpty=false;
                    
                    if (!item.children.some(child => child.name === name)) {
                        if(type){
                            item.children.push({    
                                type: true,
                                name: name,
                                active: false,
                            });
                            
                        }else{
                            item.children.push({    
                                type: false,
                                name: name,
                                active: false,
                            });

                        }
                    }
                
                } else if (item.active === false && item.children) {
                    doCreateFolder(item.children);
                }
                return item;
            });
        };


        setDirectory(prev => {
            const updatedDirectory = doCreateFolder(prev);
    
            if (!checkEmpty) {
                
                return updatedDirectory;
            } else {
                return [...updatedDirectory, { name: name, type: type, active: false }];
            }
        });
    };
    
    //delete the items /////////////////////////


    const deleteDoc=(name:string)=>{
        if(!name) return;
        const deleteDocFunc = (arr: DirectoryItem[], name: string): DirectoryItem[] => {
            return arr.reduce((acc: DirectoryItem[], item: DirectoryItem) => {
                if (item.name === name) {
                    return acc; 
                } else if (item.children) {
                    const filteredChildren = deleteDocFunc(item.children, name);
                    return [...acc, { ...item, children: filteredChildren }];
                } else {
                    return [...acc, item];
                }
            }, []);
        };
        setDirectory(prev=>deleteDocFunc(prev,name))
    };


    //reset all active items ////////////////////

    const resetActive=()=>{
        setDirectory(prev=>makeDeactive(prev))
    }

    return (
        <DirectoryContext.Provider value={{ directory, changeName,findActive,createDoc,deleteDoc,resetActive }}>
            {children}
        </DirectoryContext.Provider>
    );
};

// Custom hook for accessing the directory context
export const useDirectory = (): DirectoryContextType => {
    const context = useContext(DirectoryContext);
    if (!context) {
        throw new Error('useDirectory must be used within a DirectoryProvider');
    }
    return context;
};

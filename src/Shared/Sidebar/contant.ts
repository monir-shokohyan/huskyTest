type directoryType={
    name:string,
    type:boolean,
    active:boolean,
    children?:directoryType[],

}


export const defaultDirectory:directoryType[]=[
    {
        name:'Main',
        type:true,
        active:false,
        children:[
            {
                name:'Assets',
                type:true,
                active:false,
            },
            {
                name:'index2.tsx',
                type:false,
                active:false,

            },
            
        ]
    },
    {
        name:'src',
        type:true,
        active:false,
        children:[
            {
                name:'components',
                type:true,
                active:false,
            },
            {
                name:'main.tsx',
                type:false,
                active:false,
            },
            {
                name:'main.css',
                type:false,
                active:false,
            }, 
        ]
    },
    {
        name:'index.tsx',
        type:false,
        active:false,
    },
    {
        name:'index.css',
        type:false,
        active:false,
    },
];




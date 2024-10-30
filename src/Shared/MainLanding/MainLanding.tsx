import cn from "../Utils/cn"

const MainLanding = ({className}:{className:string}) => {
  return (
    <div className="flex justify-center items-center bg-red-600 h-screen w-5/6">

        <h1 className={cn('text-red-600',className)}>MainLanding</h1>

    </div>
  )
}

export default MainLanding;
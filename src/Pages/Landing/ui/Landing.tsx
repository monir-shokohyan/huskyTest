import { DirectoryProvider } from "@/Shared/Context/DirectoryContext";
import MainLanding from "@/Shared/MainLanding/MainLanding";
import Sidebar from "@/Shared/Sidebar/Sidebar";

const Landing = () => {
 

  return (
  <div className="w-full ">
    <DirectoryProvider>

    <Sidebar />
    <MainLanding className="bg-red"/>
 
    </DirectoryProvider>

  </div>
  )
}

export default Landing;

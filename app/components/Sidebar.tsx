// import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
import Link from 'next/link';
type SidebarProps = {
    isOpen: boolean;
    toggleSidebar: () => void;
  };
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar}) => {



  return(
<>
 <div 
 onClick={toggleSidebar}
 className={`fixed top-0 w-screen h-screen  z-10 ${isOpen ? 'transform translate-x-0' : 'hidden transform translate-x-full'}`}>
    <div
      className={`fixed top-0 right-0 w-64 sm:w-1/3 max-w-80 h-full bg-black/60  text-black py-20 transition-transform text-md ${isOpen ? 'transform translate-x-0' : 'transform translate-x-full'} z-20`}
    >
      <div className="flex justify-center mb-4">
        <i className="fas fa-xmark text-xl cursor-pointer text-red-500"></i>
      </div>
      
      <div className="text-center text-xl divide ">
      <h3 className="m-2">
        <Link href="/Home/1">
          <span className="text-white hover:text-[#1396a0] transform scale-105 transition-colors duration-300 ease-out">
            الرئيسية
          </span>
        </Link>
      </h3>
      <h3 className="m-3">
        <Link href="/MangaFilter/undefined/1">
          <span className="  text-white hover:text-[#1396a0] transition-colors">
            قائمة المانحا
          </span>
        </Link>
      </h3>
      {/* <h3 className="m-3">
        <Link href="/about">
          <span className="text-white hover:text-[#1396a0] transition-colors">
            عنّا
          </span>
        </Link>
      </h3>
      <h3 className="m-3">
        <Link href="/services">
          <span className=" text-white hover:text-[#1396a0] transition-colors">
            الخدمات
          </span>
        </Link>
      </h3>
      <h3 className="m-3">
        <Link href="/blog">
          <span className="text-white hover:text-[#1396a0] transition-colors">
            المدونة
          </span>
        </Link>
      </h3>
      <h3 className="m-3">
        <Link href="/contact">
          <span className="text-white hover:text-[#1396a0] transition-colors">
            اتصل بنا
          </span>
        </Link>
      </h3> */}
    </div>
    </div>
    </div>
    </>
  )};
  
  export default Sidebar;
  
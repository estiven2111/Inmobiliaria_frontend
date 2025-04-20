/* eslint-disable react/prop-types */
import { IoCloseCircle } from "react-icons/io5";
import Maps from "../components/Maps/Maps";

const FullMapModal = ({ toggleFullMap }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full  max-w-3xl mx-auto my-8">
        <div className="relative bg-white  rounded-xl">
          <div className="absolute z-10 top-0 right-0 mt-2 mr-2">
            <button
              className="text-gray-500 hover:text-gray-700  focus:outline-none"
              onClick={toggleFullMap}
            >
              <IoCloseCircle className="text-3xl" />
            </button>
          </div>
          <div className=" p-2">
            <Maps />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullMapModal;

// /* eslint-disable react/prop-types */
// import { IoCloseCircle } from "react-icons/io5";
// import Maps from "../components/Maps/Maps";

// const FullMapModal = ({ toggleFullMap }) => {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="relative w-full max-w-3xl mx-auto my-8">
//         <div className="relative bg-white rounded-xl">
//           <div className="absolute top-0 right-0 mt-2 mr-2">
//             <button
//               className="text-gray-500 hover:text-gray-700 focus:outline-none"
//               onClick={toggleFullMap}
//             >
//               <IoCloseCircle className="text-3xl" />
//             </button>
//           </div>
//           <div className="p-5">
//             <Maps />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FullMapModal;
//

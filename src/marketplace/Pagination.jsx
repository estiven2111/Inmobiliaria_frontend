/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars

import { useEffect, useState } from "react";
import { Input, initTE } from "tw-elements";
import { useNavigate, useSearchParams } from "react-router-dom";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const paginasVisibles = 3;
  //? Calcular el rango de paginas a mostrar
  let startPage = Math.max(1, currentPage - Math.floor(paginasVisibles / 2));
  let endPage = Math.min(totalPages, startPage + paginasVisibles - 1);

  //? en caso de que el total de paginas sea menos al de paginas visibles
  if (totalPages <= paginasVisibles) {
    startPage = 1;
    endPage = totalPages;
  } else {
    //? ellipsis si hay mas de 8 paginas y no todas las paginas son visibles
    const paginasAntesPunticos = currentPage - startPage;
    const paginasDespuesPunticos = endPage - currentPage;

    if (paginasAntesPunticos < Math.floor(paginasVisibles / 2)) {
      endPage = Math.min(
        totalPages,
        endPage + (Math.floor(paginasVisibles / 2) - paginasAntesPunticos)
      );
    }
    if (paginasDespuesPunticos < Math.ceil(paginasVisibles / 2)) {
      startPage = Math.max(
        1,
        startPage - (Math.ceil(paginasVisibles / 2) - paginasDespuesPunticos)
      );
    }
    // //? Incluir la ultima pagina si no esta incluida
    // if (endPage < totalPages) {
    //   const pagesToAdd = Math.min(totalPages - endPage, paginasVisibles);
    //   endPage = endPage + pagesToAdd;
    // }
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  // To handle the case when there are fewer pages
  const renderFirstPageButton = currentPage > 3 && totalPages > paginasVisibles;
  const renderLastPageButton =
    currentPage < totalPages - 3 && totalPages > paginasVisibles;

  return (
    <div className="pt-5 flex gap-2 text-lg justify-center items-center">
      <button
        className={`${currentPage === 1 ? "text-gray-300" : null}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
      {renderFirstPageButton && (
        <button
          className={`${
            currentPage === 1 ? "bg-slate-200 dark:bg-slate-700" : ""
          } px-3 py-1 border border-gray-300 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-800`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      )}
      {startPage > 1 && (
        <span className="px-3 py-1 border border-gray-300 rounded-xl">...</span>
      )}
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      ).map((page) => (
        <button
          className={`${
            currentPage === page ? "bg-slate-200 dark:bg-slate-700" : ""
          } px-3 py-1 border border-gray-300 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-800`}
          key={page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages && (
        <>
          <span className="px-3 py-1 border border-gray-300 rounded-xl">
            ...
          </span>
        </>
      )}

      {renderLastPageButton && (
        <button
          className={`${
            currentPage === totalPages ? "bg-slate-200 dark:bg-slate-700" : ""
          } px-3 py-1 border border-gray-300 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-800`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      )}
      <button
        className={`${currentPage === totalPages ? "text-gray-300" : null}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;

//! PAGINATION WITH INPUT
// const Pagination = ({ pagesTotal, currentPage, handlePageChange }) => {
//   const navigate = useNavigate();

//   // const [useSearchParams, setSearchParams] = useSearchParams();
//   const [pageInput, setPageInput] = useState(currentPage);

//   useEffect(() => {
//     setPageInput(currentPage);
//     initTE({ Input });
//   }, [currentPage]);

//   // const updatePageInUrl = (page) => {
//   //   setSearchParams({ page });
//   // };

//   const nextPageHandler = () => {
//     handlePageChange(currentPage + 1);
//     setPageInput(currentPage + 1);
//     // updatePageInUrl(currentPage + 1);
//   };

//   const prevPageHandler = () => {
//     handlePageChange(currentPage - 1);
//     setPageInput(currentPage - 1);
//     // updatePageInUrl(currentPage - 1);
//   };

//   const inputValidation = (e) => {
//     const { value } = e.target;
//     if (e.keyCode === 13) {
//       if (
//         parseInt(value) < 1 ||
//         parseInt(value) > pagesTotal ||
//         isNaN(parseInt(value))
//       ) {
//         handlePageChange(1);
//         setPageInput(1);
//         // updatePageInUrl(1);
//       } else {
//         handlePageChange(parseInt(value));
//         setPageInput(parseInt(value));
//         // updatePageInUrl(parseInt(value));
//       }
//     }
//   };

//   const onChangeHandler = (e) => {
//     setPageInput(e.target.value);
//   };

//   return (
//     <div className="pt-5 flex justify-center items-center">
//       <div className="flex justify-center gap-3 items-center text-2xl">
//         <button
//           disabled={currentPage === 1}
//           className={`${
//             currentPage === 1 ? "text-gray-400" : "text-gray-900"
//           } `}
//           onClick={prevPageHandler}
//         >
//           &laquo;
//         </button>

//         <input
//           className="w-11 px-2 bg-transparent rounded-md border-[1px] ring-gray-400"
//           onKeyDown={inputValidation}
//           onChange={onChangeHandler}
//           autoComplete="off"
//           value={pageInput}
//         />

//         <p>
//           {currentPage} - {pagesTotal}
//         </p>
//         <button
//           className={`${
//             currentPage === pagesTotal ? "text-gray-400" : "text-gray-900"
//           } `}
//           disabled={currentPage === pagesTotal}
//           onClick={nextPageHandler}
//         >
//           &raquo;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;

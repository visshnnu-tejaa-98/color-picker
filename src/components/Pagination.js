import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ paginationData, setPaginationData }) => {
  let { previous, next, pagestoshow, currentPage, pageCount } = paginationData;
  if (pagestoshow.length === 1) {
    return <div className="h-5"></div>;
  }
  return (
    <div className="flex justify-center mt-8 p-2">
      <div className="flex items-center">
        <Link
          to={`?page=${previous}`}
          className={`mx-1 text-sm font-semibold text-white-900 ${
            currentPage === 1 && "cursor-not-allowed"
          }`}
        >
          ← Previous
        </Link>
        {pagestoshow.map((page) => (
          <Link
            to={`?page=${page}`}
            className={` ${
              page === currentPage
                ? "mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 font-bold text-white-900 bg-[#6F2193] hover:scale-105"
                : "mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-white-900 hover:scale-105"
            }`}
          >
            {page}
          </Link>
        ))}
        <Link
          to={`?page=${next}`}
          className={`mx-1 text-sm font-semibold text-white-900 ${
            currentPage === pageCount && "cursor-not-allowed"
          }`}
        >
          next →
        </Link>
      </div>
    </div>
  );
};

export default Pagination;

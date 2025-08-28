import React from "react";
import "./Pagination.css";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange, maxPagesToShow = 5 }) => {
  if (totalPages === 0) return null;

  const pages = [];

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        <ChevronsLeft size={18} />
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft size={18} />
      </button>

      {startPage > 1 && <span className="ellipsis">...</span>}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && <span className="ellipsis">...</span>}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <ChevronRight size={18} />
      </button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
        <ChevronsRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;

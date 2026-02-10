import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    /* Matches Figma: 1200px width, 80px height, white bg, column center */
    <div className="flex flex-col items-center justify-center w-full max-w-[1200px] h-[80px] bg-[#FFFFFF] px-[10px] py-[24px] gap-[10px] border-t border-black/5">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-black/5 disabled:opacity-20 transition-colors"
        >
          <ChevronsLeft size={16} />
        </button>
        
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-black/5 disabled:opacity-20 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1">
          {renderPageNumbers().map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="px-2 text-black/40 text-sm">...</span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                className={`min-w-[32px] h-[32px] rounded-lg text-sm font-semibold transition-all ${
                  currentPage === p
                    ? "bg-[#333333] text-white shadow-sm"
                    : "text-foreground hover:bg-black/5"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-black/5 disabled:opacity-20 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
        
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-black/5 disabled:opacity-20 transition-colors"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
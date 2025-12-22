interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) => (
  <div className="flex justify-center items-center gap-4 mt-6 mb-12">
    <button
      onClick={onPrevious}
      disabled={currentPage === 0}
      className="px-4 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 cursor-pointer"
    >
      Previous
    </button>
    <span className="text-white">
      Page {currentPage + 1} of {totalPages}
    </span>
    <button
      onClick={onNext}
      disabled={currentPage >= totalPages - 1}
      className="px-4 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 cursor-pointer"
    >
      Next
    </button>
  </div>
);

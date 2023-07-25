import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

interface PaginatedDataProps<T> {
  itemsPerPage: number;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const PaginatedData = <T,>({
  itemsPerPage,
  items,
  renderItem,
}: PaginatedDataProps<T>) => {
  const [currentItems, setCurrentItems] = useState<T[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (e: any) => {
    const newOffset = (e?.selected * itemsPerPage) % items?.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems?.map((item: T) => {
        return renderItem(item);
      })}

      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        activeClassName="active_page"
        className="w-[400px] font-bold flex justify-center gap-2 mt-4 cursor-pointer"
      />
    </>
  );
};

export default PaginatedData;

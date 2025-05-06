import { PAGINATION } from "@/config";

const rowCountOfPage = PAGINATION.rowCountOfPage;
const pageCountOfPagination = PAGINATION.pageCountOfPagination;

function getOffset(pageNo, rowCountOfPage = PAGINATION.rowCountOfPage) {
  const start = (pageNo * 1 - 1) * rowCountOfPage;
  const end = start + rowCountOfPage;
  return { start, end };
}

function getTotalPage(count, rowCountOfPage = PAGINATION.rowCountOfPage) {
  return Math.ceil((count * 1) / rowCountOfPage);
}

export default {
  getOffset,
  getTotalPage,
  rowCountOfPage,
  pageCountOfPagination,
};

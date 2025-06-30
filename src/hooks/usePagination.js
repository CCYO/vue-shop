import { ref, computed } from "vue";
import { PAGINATION } from "@/config";

// 不開放修改
const maxRowsOfPage = PAGINATION.maxRowCountOfPage;
const minRowsOfPage = PAGINATION.minRowCountOfPage;
const pagesOfPagination = PAGINATION.pageCountOfPagination;

export default function () {
  const currentPage = ref(1);
  const rowsOfPage = ref(PAGINATION.rowCountOfPage);

  const offset = computed(() => {
    const start = (currentPage.value - 1) * rowsOfPage.value;
    const limit = rowsOfPage.value;
    const end = start + limit;
    return { start, end, limit };
  });

  function getOffset(pageNo) {
    const start = (pageNo * 1 - 1) * rowsOfPage.value;
    const end = start + rowsOfPage.value;
    return { start, end };
  }

  function getTotalPage(count) {
    return Math.ceil((count * 1) / rowsOfPage.value);
  }

  return {
    getOffset,
    getTotalPage,

    currentPage,
    offset,
    rowsOfPage,

    maxRowsOfPage,
    minRowsOfPage,
    pagesOfPagination,
  };
}

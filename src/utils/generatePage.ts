import { IMeetupDto, IPageView } from '../common/models/interfaces';

export const generatePage = <T>(
  items: T[],
  totalCount: number,
  { pageIndex, pageSize }: IPageView
): IMeetupDto<T> => {
  const totalPages =
    totalCount % pageSize !== 0
      ? Math.ceil(totalCount / pageSize)
      : totalCount / pageSize;

  return {
    items,
    pageView: {
      hasNextPage: pageIndex >= 1 && pageIndex < totalPages,
      hasPreviousPage: pageIndex <= totalPages && pageIndex > 1,
      pageIndex,
      totalCount,
      totalPages,
    },
  };
};

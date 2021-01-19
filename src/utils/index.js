/**
 *
 * @typedef {Object} PaginationQuery
 * @property {Number} [page] Current page [1, .., n]
 * @property {Number} [size] Response rows limit [1, .., n]
 * @property {String} [mode] Response mode
 * @property {String} [searchTerm] Search term to filter result
 * @property {Boolean} [descending] Records order
 * @property {Object} [filters] Filters object
 *
 */

/**
 * @param {PaginationQuery} queryObj
 */
// eslint-disable-next-line import/prefer-default-export
export function composeQuery(queryObj = { page: 1, size: 10 }) {
  const {
    page = 1, size = 10, mode, pagination,
  } = queryObj;
  const query = { skip: (page * size) - size };
  if (size > -1) query.limit = size;
  if (mode) query.mode = mode;
  if (pagination) query.pagination = pagination;
  return query;
}

export function Pagination(props) {
  const { pages, currentPage, pagination, setSelectedUsers } = props;

  //changing page removes all the Users id from selectesdUsers array
  const setSelectedUsersAsNone = () => {
    setSelectedUsers([]);
  };

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        {pages.map((page, index) => {
          return (
            <li
              onClick={setSelectedUsersAsNone}
              key={index}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <p className="page-link" onClick={() => pagination(page)}>
                {page}
              </p>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}



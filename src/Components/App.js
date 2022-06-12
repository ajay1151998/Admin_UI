import { useEffect,useState} from "react";
import _ from "lodash";

import Table from "./TableBody";
import { api } from "../API/url"
import { Pagination } from "../Components/Pagination";


const pageSize=10;

function App() {
  const [users, setUsers] = useState([]);
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setPaginatedUsers(_(data).slice(0).take(pageSize).value());
      });
  }, []);

  const pageCount = users ? Math.ceil(users.length / pageSize) : 0;
  const pages = _.range(1, pageCount);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginateUser = _(users).slice(startIndex).take(pageSize).value();
    setPaginatedUsers(paginateUser);
  };
  return (
    <div>
      <Table
        users={users}
        setUsers={setUsers}
        paginatedUsers={paginatedUsers}
        setPaginatedUsers={setPaginatedUsers}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        currentPage={currentPage}
      />

      <Pagination
        pages={pages}
        currentPage={currentPage}
        pagination={pagination}
        setSelectedUsers={setSelectedUsers}
      />
    </div>
  );
}

export default App;
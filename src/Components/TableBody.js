import TableRow from "./TableRow";
import Searchbar from "./Searchbar";

function Table(props) {
  const {
    users,
    setUsers,
    paginatedUsers,
    setPaginatedUsers,
    selectedUsers,
    setSelectedUsers,
    currentPage,
  } = props;

  //implimenting deletion of user:-removing the deleted user from paginatedUsers and all Users and if users are present in selectedUsers then removing from there also.
  const deleteUser = (id) => {
    const filteredArray = paginatedUsers.filter((user) => user.id !== id);
    const filteredArray2 = users.filter((user) => user.id !== id);
    const filteredArr = selectedUsers.filter((ids) => ids !== id);
    setSelectedUsers(filteredArr);
    setUsers(filteredArray2);
    setPaginatedUsers(filteredArray);
  };

  //chnaging user details like name,email,role.
  const changeUserDetail = (id, newName, newEmail, newRole) => {
    if (newName.length === 0 || newEmail.length === 0 || newRole.length === 0) {
      alert("Please Enter Valid Details");
      return;
    }
    const index = users.findIndex((user) => user.id === id);
    users[index].name = newName;
    users[index].email = newEmail;
    users[index].role = newRole;
    setUsers(users);
  };

  return (
    <div id="main">
      <Searchbar
        setPaginatedUsers={setPaginatedUsers}
        users={users}
        setUsers={setUsers}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        currentPage={currentPage}
      />

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>
              {" "}
              <input type="checkbox" disabled={true} />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => {
            return (
              <TableRow
                user={user}
                deleteUser={deleteUser}
                changeUserDetail={changeUserDetail}
                key={user.id}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

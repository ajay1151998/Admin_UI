import _ from "lodash";

//users shown in one page.
const pageSize = 10;

function Searchbar(props) {
  const {
    users,
    setUsers,
    setPaginatedUsers,
    selectedUsers,
    setSelectedUsers,
    currentPage,
  } = props;

  //filtering users and setting users and paginated users on the basis of text entered in search bar
  const filterUser = (e) => {
    const newValue = e.target.value.toLowerCase();
    const filteredUsers = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(newValue) ||
        user.email.toLowerCase().includes(newValue) ||
        user.role.toLowerCase().includes(newValue)
      );
    });
    setPaginatedUsers(_(filteredUsers).slice(0).take(pageSize).value());
  };

  //clicking on deleteSelected button deletes all the users whose id's are present in selectedUser array.
  const deleteSelectedUser = () => {
    if (selectedUsers.length === 0) {
      alert("Please Select Users To Delete");
      return;
    }
    const filteredUsers = users.filter((user) => {
      if (!selectedUsers.includes(user.id)) {
        return true;
      } else {
        return false;
      }
    });
    setSelectedUsers([]);
    setUsers(filteredUsers);
    setPaginatedUsers(
      _(filteredUsers)
        .slice((currentPage - 1) * 10)
        .take(pageSize)
        .value()
    );
  };

  return (
    <div id="searchbarContainer">
      <div id="searchbar">
        <input
          placeholder="Search by name or email or role"
          onChange={filterUser}
        />
      </div>
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={deleteSelectedUser}
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
}

export default Searchbar;

import UserRow from "./UserRow";
import "./userstable.scss";

export default function UsersTable({ usersData, isAutoComplete = false }) {
  return isAutoComplete ? (
    <div className="table-wrapper">
      <table className="autocomplete-table">
        <tbody>
          <UserRow userInfo={usersData} isImg={isAutoComplete} />
        </tbody>
      </table>
    </div>
  ) : (
    <div className="table-wrapper">
      <table className="autocomplete-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>E-mail</th>
            <th>Téléphone</th>
            <th>Pays</th>
            <th>Ville</th>
          </tr>
        </thead>
        <tbody>
          <UserRow userInfo={usersData} />
        </tbody>
      </table>
    </div>
  );
}

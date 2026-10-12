import "./usersearch.scss";

export default function UserSearch({ valueInput, onChangeInput }) {
  return (
    <input
      type="text"
      name="inputSearch"
      id=""
      onChange={onChangeInput}
      value={valueInput}
      placeholder="Recherche par : nom, prénom, ville, pays"
    />
  );
}

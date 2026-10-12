import "./userssorted.scss";

export default function UsersSorted({ onClickSort }) {
  return (
    <div className="sort-buttons">
      <button onClick={() => onClickSort("All")}>Tout</button>
      <button onClick={() => onClickSort("Name")}>Noms</button>
      <button onClick={() => onClickSort("Country")}>Pays</button>
      <button onClick={() => onClickSort("City")}>Villes</button>
    </div>
  );
}

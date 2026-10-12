export default function UserRow({ userInfo, isImg = false }) {
  function uniqueId() {
    return crypto.randomUUID();
  }
  return (
    <>
      {Array.isArray(userInfo) &&
        userInfo.map((data, index) => (
          <tr key={index + uniqueId()}>
            {isImg ? null : (
              <td>
                <img
                  src={data?.picture.medium}
                  alt={data?.name.first + " " + data?.name.last}
                />
              </td>
            )}
            <td>{data?.name.last}</td>
            <td>{data?.name.first}</td>
            <td>{data?.email}</td>
            <td>{data?.cell}</td>
            <td>{data?.location.country}</td>
            <td>{data?.location.city}</td>
          </tr>
        ))}
    </>
  );
}

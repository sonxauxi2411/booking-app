function Table({ children, title }) {
  return (
    <table className="border container">
      <tr className="border">
        {title.map((t, index) => {
          return (
            <th className="p-2" key={index}>
              <div className="  border-end">
                <span>{t}</span>
              </div>
            </th>
          );
        })}
      </tr>
      {children}
    </table>
  );
}

export default Table;

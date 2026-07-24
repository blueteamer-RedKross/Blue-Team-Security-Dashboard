export default function Table({ columns, data, children }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-border bg-panel shadow-premium">
      <table className="min-w-full border-separate border-spacing-0 text-sm">
        <thead className="bg-[#0f1728] text-slate-400">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="border-b border-border px-5 py-4 text-left font-semibold uppercase tracking-[0.18em]">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border last:border-0 hover:bg-[#111b2f]">
              {columns.map((column) => (
                <td key={column.key} className="px-5 py-4 text-slate-200">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {children}
    </div>
  );
}

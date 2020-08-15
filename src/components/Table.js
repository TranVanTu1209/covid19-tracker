import React from 'react';

const Table = ({ countries }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>
              Country Name
            </th>
            <th>
              Cases
            </th>
          </tr>
        </thead>
        <tbody>
          {
            countries.map(({ country, cases }, id) => (
              <tr key={id}>
                <td>
                  {country}
                </td>
                <td>
                  {cases}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table;

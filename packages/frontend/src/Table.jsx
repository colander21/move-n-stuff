import CardboardBox from "./pages/CardboardBox";

function Table(props) {
  console.log("Box data in Table:", props.boxData); // Log to ensure data is passed correctly
  return (
    <table>
      {/* <TableHeader /> */}
      <TableBody boxData={props.boxData} />
    </table>
  );
}

// function TableHeader() {
//   return (
//     <thead>
//       <tr>
//         <th>Name</th>
//         <th>Job</th>
//         <th>Id</th>
// 	<th>Remove</th>
//       </tr>
//     </thead>
//   );
// }

function TableBody(props) {
  const rows = props.boxData.map((row, index) => {
    return (
      <tr key={index}>
        <td>
          <CardboardBox />
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

export default Table;

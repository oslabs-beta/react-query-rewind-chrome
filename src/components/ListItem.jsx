import React from "react";

function ListItem(props) {
  return (
    <div style={{ backgroundColor: "blue", margin: ".5rem" }}>
      <div>{"Key: " + props.msg.message.queryKey[0]}</div>
      <div>{"Type: " + props.msg.message.type}</div>
      <div>
        {props.msg.message.data &&
          props.msg.message.data.map((dataItem) => (
            <div key={dataItem.id}>
              {dataItem.name}: {dataItem.checked.toString()}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ListItem;

// import React from "react";

// interface ListItemProps {
//   msg: {
//     message: {
//       queryKey: string[];
//       type: string;
//       data?: {
//         id: number;
//         name: string;
//         checked: boolean;
//       }[];
//     };
//   };
// }

// const ListItem: React.FC<ListItemProps> = (props) => {
//   return (
//     <div style={{ backgroundColor: "blue", margin: ".5rem" }}>
//       <div>{"Key: " + props.msg.message.queryKey[0]}</div>
//       <div>{"Type: " + props.msg.message.type}</div>
//       <div>
//         {props.msg.message.data &&
//           props.msg.message.data.map((dataItem) => (
//             <div key={dataItem.id}>
//               {dataItem.name}: {dataItem.checked.toString()}
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default ListItem;

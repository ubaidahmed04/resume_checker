// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000"); // backend server

// const SmsPage = () => {
//   const [smsData, setSmsData] = useState([]);

//   // Step 1: Fetch initial data from API
//   const fetchData = async () => {
//       console.log("API calling...");

//     try {
//       const res = await axios.get("http://localhost:5000/getSmsSent/24146");
//       console.log("Initial data:", res);
//       setSmsData(res.data.data);
//     } catch (err) {
//       console.error("Error fetching SMS data:", err);
//     }
//   };

//   useEffect(() => {
//     fetchData();

//     // Step 2: Listen for live updates from socket
//     socket.on("data:update", (updatedData) => {
//       console.log("Received updated data:", updatedData);
//       setSmsData(updatedData);
//     });

//     // Cleanup listener on unmount
//     return () => {
//       socket.off("data:update");
//     };
//   }, []);

//   useEffect(() => {
//   // Step 1: Register user after connect
//   socket.emit("register", { userid: "24146" }); // Replace with real user ID

//   // Step 2: Trigger messageReceived manually
//   setTimeout(() => {
//     socket.emit("messageReceived", {
//       // userid: 3041,
//       userid: 24146,
//       receiveDate: new Date().toISOString().slice(0, 19).replace("T", " "),
//       readStatus: 1,
//       readDate: new Date().toISOString().slice(0, 19).replace("T", " "),
//     });
//   }, 3000); // after 3 seconds
// }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-bold mb-2">📩 SMS Data</h2>
//       <ul>
//         {smsData.map((sms, index) => (
//           <li key={index}>
//             {sms.SOURCE} — {sms.TEXT}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SmsPage;

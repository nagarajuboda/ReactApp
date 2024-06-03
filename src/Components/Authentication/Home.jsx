// import styles from "../../CSS/Login.module.css";
// import logo from "../../Images/image.jpg";
// import Login from "./Login";
// import "react-toastify/dist/ReactToastify.css";

// import VerifyOTP from "./VerifyOTP";

// import { ToastContainer, toast } from "react-toastify";
// import { useState } from "react";
// export default function Home({ data }) {
//   console.log(data, "fjsdikjds");
//   const [Issuccess, setIsSuccess] = useState(false);
//   return (
//     <div className={styles.maindiv}>
//       <div className={styles.LoginLogo}>
//         <img src={logo} alt="Logo" />
//       </div>
//       <div className={styles.Loginform}>
//         <div className={styles.startdiv}>
//           <p className={styles.indicate}>* indicates mandatory fields</p>
//         </div>
//         {!Issuccess ? <Login /> : <VerifyOTP />}
//       </div>
//       <ToastContainer position="top-end" autoClose={5000} />
//     </div>
//   );
// }

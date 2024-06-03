// import { useState } from "react";
// import styles from "../../CSS/VerifyOtp.module.css";
// import { VerifyOtpValidation } from "../FormValidations/VerifyOtpValidation";
// import { Link, Router, useNavigate } from "react-router-dom";
// import VerifyOtpService from "../../Service/VerifyOtpService";

// export default function VerifyOTP({ phone }) {
//   const navigate = useNavigate();
//   const [otp, setotp] = useState("");
//   const [errors, setErrors] = useState({});
//   const [showVerifyButton, setShowVerifyButton] = useState(false);
//   function handleBlur(e) {
//     const { name, value } = e.target;
//     let error = "";

//     if (name === "otp") {
//       error = VerifyOtpValidation(value);
//     }

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: error,
//     }));
//   }

//   function handleChange(e) {
//     const { name, value } = e.target;
//     if (name === "otp") {
//       setotp(value);
//       const error = VerifyOtpValidation(value);
//       if (!error) {
//         setErrors((prevErrors) => {
//           const { [name]: removedError, ...rest } = prevErrors;
//           return rest;
//         });
//       } else {
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: error,
//         }));
//       }
//     }
//   }

//   async function formSubmit(e) {
//     e.preventDefault();
//     const phoneError = VerifyOtpValidation(otp);
//     if (!phoneError) {
//       var obj = {
//         PhoneNumber: phone,
//         Otp: otp,
//       };
//       console.log(obj, "component obj");
//       var responses = await VerifyOtpService(obj);
//       console.log(responses, "after submit the form response");
//       console.log(responses.isSuccess, "fjskda");
//       if (responses.isSuccess == true) {
//         console.log("navigation block");
//         navigate("/UserDashboard");
//       }
//       console.log("formSubmitted");
//     } else {
//       setErrors({ otp: phoneError });
//     }
//   }

//   return (
//     <div>
//       <form onSubmit={formSubmit}>
//         <p style={{ fontSize: "1.2em" }}>Verify OTP</p>
//         <div className="formdiv">
//           <div>
//             <label className="d-flex">OTP *</label>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               name="otp"
//               value={otp}
//               className="form-control w-75"
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//             {errors.otp && (
//               <p style={{ color: "red", marginLeft: "6px" }}>{errors.otp}</p>
//             )}
//           </div>

//           {showVerifyButton && (
//             <div className="mt-3">
//               <input
//                 type="submit"
//                 className="form-control w-75 phone"
//                 name="otp"
//                 value="Verify OTP"
//                 style={{ backgroundColor: "#48D1CC" }}
//               />
//             </div>
//           )}
//           <div>
//             <Link to="/Login" className={styles.resend}>
//               Resend
//             </Link>
//           </div>
//           <div className={styles.newuser}>
//             <p className="ms-1">Already have a account?</p>
//             <p style={{ color: "#48D1CC" }} className="ms-2">
//               {/* <Link to="/Login" className={styles.signupfro}>
//                 Back To Login
//               </Link> */}
//               <a href="/Login" className={styles.signupfro}>
//                 Login
//               </a>
//             </p>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import styles from "../../CSS/VerifyOtp.module.css";
import { VerifyOtpValidation } from "../FormValidations/VerifyOtpValidation";
import { Link, useNavigate } from "react-router-dom";
import VerifyOtpService from "../../Service/VerifyOtpService";

export default function VerifyOTP({ phone }) {
  const navigate = useNavigate();
  const [otp, setotp] = useState("");
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  function handleBlur(e) {
    const { name, value } = e.target;
    let error = "";

    if (name === "otp") {
      error = VerifyOtpValidation(value);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "otp") {
      setotp(value);
      const error = VerifyOtpValidation(value);
      if (!error) {
        setErrors((prevErrors) => {
          const { [name]: removedError, ...rest } = prevErrors;
          return rest;
        });
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error,
        }));
      }

      // Enable Verify OTP button only when OTP is exactly 6 characters long
      setIsButtonDisabled(value.length !== 6);
    }
  }

  async function formSubmit(e) {
    e.preventDefault();
    const phoneError = VerifyOtpValidation(otp);
    if (!phoneError) {
      var obj = {
        PhoneNumber: phone,
        Otp: otp,
      };
      console.log(obj, "component obj");
      var responses = await VerifyOtpService(obj);
      console.log(responses, "after submit the form response");
      console.log(responses.isSuccess, "fjskda");
      if (responses.isSuccess == true) {
        console.log("navigation block");
        navigate("/UserDashboard");
      }
      console.log("formSubmitted");
    } else {
      setErrors({ otp: phoneError });
    }
  }

  return (
    <div>
      <form onSubmit={formSubmit}>
        <p style={{ fontSize: "1.2em" }}>Verify OTP</p>
        <div className="formdiv">
          <div>
            <label className="d-flex">OTP *</label>
            <input
              type="text"
              placeholder="Enter OTP"
              name="otp"
              value={otp}
              className="form-control w-75"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.otp && (
              <p style={{ color: "red", marginLeft: "6px" }}>{errors.otp}</p>
            )}
          </div>

          <div className="mt-3">
            <input
              type="submit"
              className="form-control w-75 phone"
              name="otp"
              value="Verify OTP"
              style={{
                backgroundColor: "#48D1CC",
                // Disable the button if OTP is not exactly 6 characters long
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
                opacity: isButtonDisabled ? 0.5 : 1,
              }}
              disabled={isButtonDisabled} // Disable button based on state
            />
          </div>
          <div>
            <Link to="/Login" className={styles.resend}>
              Resend
            </Link>
          </div>
          <div className={styles.newuser}>
            <p className="ms-1">Already have an account?</p>
            <p style={{ color: "#48D1CC" }} className="ms-2">
              <a href="/Login" className={styles.signupfro}>
                Login
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

import { useState } from "react";
import styles from "../../CSS/Login.module.css";
import logo from "../../Images/image.jpg";
import { validatePhone } from "../FormValidations/validatePhone"; // Import the validation function
import AuthenticationService from "../../Service/AuthenticationService";
import "react-toastify/dist/ReactToastify.css";

import VerifyOTP from "./VerifyOTP";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export default function Login() {
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [Issuccess, setIssuccess] = useState(false);
  function handleBlur(e) {
    const { name, value } = e.target;
    let error = "";

    if (name === "PhoneNumber") {
      error = validatePhone(value);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "PhoneNumber") {
      setPhone(value);
      const error = validatePhone(value);
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
    }
  }

  async function formSubmit(e) {
    e.preventDefault();
    const phoneError = validatePhone(phone);
    if (!phoneError) {
      var obj = {
        PhoneNumber: phone,
      };

      var response = await AuthenticationService(obj);
      console.log(response, "login");
      setIssuccess(response.isSuccess);
      if (!response.isSuccess) {
        toast.error(response.item.message, {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        toast.success("Verification OTP sent to your registerd MobileNumber", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } else {
      setErrors({ phoneNumber: phoneError });
    }
  }

  return (
    <div className={styles.maindiv}>
      <div className={styles.LoginLogo}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.Loginform}>
        <div className={styles.startdiv}>
          <p className={styles.indicate}>* indicates mandatory fields</p>
        </div>
        {!Issuccess ? (
          <form onSubmit={formSubmit}>
            <p style={{ fontSize: "1.2em" }}>Hello!</p>

            <div className="formdiv">
              <div>
                <label className="d-flex ms-1">
                  PhoneNumber
                  <span
                    className="mt-1 ms-1"
                    style={{ color: "red", fontSize: "1em" }}
                  >
                    {" "}
                    *
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter PhoneNumber"
                  name="PhoneNumber"
                  value={phone}
                  className="form-control w-75"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phoneNumber && (
                  <p style={{ color: "red", marginLeft: "6px" }}>
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="mt-3">
                <input
                  type="submit"
                  className="form-control w-75 phone"
                  value="Login"
                  style={{ backgroundColor: "#48D1CC" }}
                />
              </div>
              <div className={styles.newuser}>
                <p className="ms-1">Don't have an account?</p>
                <p style={{ color: "#48D1CC" }} className="ms-2">
                  <Link to="/SignUp" className={styles.signupfro}>
                    Sign up for free
                  </Link>
                </p>
              </div>
            </div>
          </form>
        ) : (
          <VerifyOTP phone={phone} />
        )}
      </div>
      <ToastContainer position="top-end" autoClose={5000} />
    </div>
  );
}

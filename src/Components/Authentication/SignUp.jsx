import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "../../CSS/SignUp.module.css";
import logo from "../../Images/Regitserpage.jpg";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpService from "../../Service/SignUpService";
import Swal from "sweetalert2";
export default function SignUp() {
  const [selectedGender, setSelectedGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const validate = () => {
    let tempErrors = {};
    if (!firstname.trim()) tempErrors.firstname = "First Name is required";
    if (!lastname.trim()) tempErrors.lastname = "Last Name is required";
    if (!selectedGender) tempErrors.gender = "Gender is required";
    if (!dateOfBirth) tempErrors.dateOfBirth = "Date of Birth is required";
    if (!phoneNumber.trim())
      tempErrors.phoneNumber = "Phone Number is required";
    if (!pincode.trim()) tempErrors.pincode = "Pincode is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (!value.trim()) {
        newErrors[name] = `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } is required`;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstname") setfirstname(value);
    if (name === "lastname") setlastname(value);
    if (name === "phoneNumber") setPhoneNumber(value);
    if (name === "pincode") setPincode(value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const formsubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (validate()) {
      const obj = {
        FirstName: firstname,
        LastName: lastname,
        PhoneNumber: phoneNumber,
        DateOfBirth: dateOfBirth,
        Gender: selectedGender,
        Pincode: pincode,
      };
      console.log("form submit", obj);

      var response = await SignUpService(obj);
      console.log(response, "null");
      console.log(response, "response");
      var mess = response.error.message;

      console.log(mess, "mess");
      if (!response.isSuccess) {
        console.log("error block");
        toast.error(response.error.message, {
          position: "top-right",
          autoClose: 5000,
        });
      } else if (response == null) {
        toast.error(
          "internal server Error please try to register after 1 hours ",
          {
            position: "top-right",
            autoClose: 5000,
          }
        );
      } else {
        Swal.fire({
          title: "Thanks You",
          text: "Registration Successfully Done!",
          icon: "success",
        });

        navigate("/Login");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.maindiv}>
      <div className={styles.imagediv}>
        <img src={logo} alt="" width="100%" height="100%" />
      </div>
      <div className={styles.formdiv}>
        <form className={styles.mainform} onSubmit={formsubmit}>
          <p className={styles.content}>Create Account</p>
          <div className="row">
            <div className="col-6">
              <div className="d-flex" style={{ display: "flex" }}>
                <label>
                  First Name <span style={{ color: "red" }}> *</span>
                </label>
              </div>
              <input
                type="text"
                name="firstname"
                className="form-control"
                placeholder="First Name"
                value={firstname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstname && (
                <span className="text-danger">{errors.firstname}</span>
              )}
            </div>
            <div className="col-6">
              <label>
                Last Name <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="text"
                name="lastname"
                className="form-control"
                placeholder="Last Name"
                value={lastname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastname && (
                <span className="text-danger">{errors.lastname}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label>
                Gender <span style={{ color: "red" }}> *</span>
              </label>
              <select
                name="gender"
                onChange={handleGenderChange}
                className="form-control"
                style={{ borderRadius: "10px", borderColor: "cadetblue" }}
                onBlur={handleBlur}
              >
                <option>
                  Select Gender <span style={{ color: "red" }}> *</span>
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
              {errors.gender && (
                <span className="text-danger">{errors.gender}</span>
              )}
            </div>
            <div className="col-6">
              <label>
                Date of Birth <span style={{ color: "red" }}> *</span>
              </label>
              <input
                aria-label="Date"
                type="date"
                name="dateOfBirth"
                className="form-control"
                value={dateOfBirth}
                onChange={handleDateChange}
                onBlur={handleBlur}
                style={{ cursor: "pointer" }}
              />
              {errors.dateOfBirth && (
                <span className="text-danger">{errors.dateOfBirth}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label>
                Phone Number <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phoneNumber && (
                <span className="text-danger">{errors.phoneNumber}</span>
              )}
            </div>
            <div className="col-6">
              <label>
                Pincode <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="text"
                name="pincode"
                className="form-control"
                placeholder="Pincode"
                value={pincode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.pincode && (
                <span className="text-danger">{errors.pincode}</span>
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <label>Choose Location</label>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-9">
              Already have an account?{" "}
              <Link to="/Login" className={styles.LoginLink}>
                Login
              </Link>
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="SIGN UP"
                // className={styles.btns}
                className="form-control"
                style={{
                  backgroundColor: "rgb(167, 190, 219)",
                  color: "white",
                }}
                // disabled={isSubmitting}
              />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="top-end" autoClose={5000} />
    </div>
  );
}

// import { Link, useNavigate } from "react-router-dom";
// import styles from "../../CSS/SignUp.module.css";
// import logo from "../../Images/boycreating.jpg";
// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import SignUpService from "../../Service/SignUpService";
// import "react-toastify/dist/ReactToastify.css";

// export default function SignUp() {
//   const [selectedGender, setSelectedGender] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [firstname, setfirstname] = useState("");
//   const [lastname, setlastname] = useState("");
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility
//   const navigate = useNavigate();

//   const handleGenderChange = (event) => {
//     setSelectedGender(event.target.value);
//   };

//   const handleDateChange = (event) => {
//     setDateOfBirth(event.target.value);
//   };

//   const validate = () => {
//     let tempErrors = {};
//     if (!firstname.trim()) tempErrors.firstname = "First Name is required";
//     if (!lastname.trim()) tempErrors.lastname = "Last Name is required";
//     if (!selectedGender) tempErrors.gender = "Gender is required";
//     if (!dateOfBirth) tempErrors.dateOfBirth = "Date of Birth is required";
//     if (!phoneNumber.trim())
//       tempErrors.phoneNumber = "Phone Number is required";
//     if (!pincode.trim()) tempErrors.pincode = "Pincode is required";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setErrors((prevErrors) => {
//       const newErrors = { ...prevErrors };
//       if (!value.trim()) {
//         newErrors[name] = `${
//           name.charAt(0).toUpperCase() + name.slice(1)
//         } is required`;
//       } else {
//         delete newErrors[name];
//       }
//       return newErrors;
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "firstname") setfirstname(value);
//     if (name === "lastname") setlastname(value);
//     if (name === "phoneNumber") setPhoneNumber(value);
//     if (name === "pincode") setPincode(value);
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//   };

//   const formsubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     if (validate()) {
//       const obj = {
//         FirstName: firstname,
//         LastName: lastname,
//         PhoneNumber: phoneNumber,
//         DateOfBirth: dateOfBirth,
//         Gender: selectedGender,
//         Pincode: pincode,
//       };
//       console.log("form submit", obj);

//       var response = await SignUpService(obj);
//       console.log(response, "null");
//       console.log(response, "response");
//       var mess = response.error.message;

//       console.log(mess, "mess");
//       if (!response.isSuccess) {
//         console.log("error block");
//         toast.error(response.error.message, {
//           position: "top-right",
//           autoClose: 5000,
//         });
//       } else if (response == null) {
//         toast.error(
//           "internal server Error please try to register after 1 hour",
//           {
//             position: "top-right",
//             autoClose: 5000,
//           }
//         );
//       } else {
//         setShowModal(true); // Show the modal on successful registration
//       }
//     }
//     setIsSubmitting(false);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     navigate("/Login");
//   };

//   return (
//     <div className={styles.maindiv}>
//       <div className={styles.imagediv}>
//         <img src={logo} alt="" width="100%" height="100%" />
//       </div>
//       <div className={styles.formdiv}>
//         <form className={styles.mainform} onSubmit={formsubmit}>
//           <div className="row">
//             <div className="col-6">
//               <div className="d-flex" style={{ display: "flex" }}>
//                 <label>
//                   First Name <span className={styles.spam}> *</span>
//                 </label>
//               </div>
//               <input
//                 type="text"
//                 name="firstname"
//                 className="form-control"
//                 placeholder="First Name"
//                 value={firstname}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.firstname && (
//                 <span className="text-danger">{errors.firstname}</span>
//               )}
//             </div>
//             <div className="col-6">
//               <label>Last Name*</label>
//               <input
//                 type="text"
//                 name="lastname"
//                 className="form-control"
//                 placeholder="Last Name"
//                 value={lastname}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.lastname && (
//                 <span className="text-danger">{errors.lastname}</span>
//               )}
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-6">
//               <label>Gender*</label>
//               <select
//                 name="gender"
//                 onChange={handleGenderChange}
//                 className="form-control"
//                 style={{ borderRadius: "10px", borderColor: "cadetblue" }}
//                 onBlur={handleBlur}
//               >
//                 <option>Select Gender</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Others</option>
//               </select>
//               {errors.gender && (
//                 <span className="text-danger">{errors.gender}</span>
//               )}
//             </div>
//             <div className="col-6">
//               <label>Date of Birth*</label>
//               <input
//                 aria-label="Date"
//                 type="date"
//                 name="dateOfBirth"
//                 className="form-control"
//                 value={dateOfBirth}
//                 onChange={handleDateChange}
//                 onBlur={handleBlur}
//                 style={{ cursor: "pointer" }}
//               />
//               {errors.dateOfBirth && (
//                 <span className="text-danger">{errors.dateOfBirth}</span>
//               )}
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-6">
//               <label>Phone Number</label>
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 className="form-control"
//                 placeholder="Phone Number"
//                 value={phoneNumber}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.phoneNumber && (
//                 <span className="text-danger">{errors.phoneNumber}</span>
//               )}
//             </div>
//             <div className="col-6">
//               <label>Pincode</label>
//               <input
//                 type="text"
//                 name="pincode"
//                 className="form-control"
//                 placeholder="Pincode"
//                 value={pincode}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.pincode && (
//                 <span className="text-danger">{errors.pincode}</span>
//               )}
//             </div>
//           </div>
//           <div className="row mt-3">
//             <div className="col-12">
//               <label>Choose Location</label>
//             </div>
//           </div>
//           <div className="row mt-3">
//             <div className="col-9">
//               Already have an account? <Link to="/Login">Login</Link>
//             </div>
//             <div className="col-3">
//               <input
//                 type="submit"
//                 value="SIGN UP"
//                 className="form-control"
//                 style={{ backgroundColor: "#03C03C", color: "white" }}
//                 // disabled={isSubmitting}
//               />
//             </div>
//           </div>
//         </form>
//       </div>
//       <ToastContainer position="top-end" autoClose={5000} />

//       {/* Bootstrap Modal */}
//       <div
//         className={`modal fade ${showModal ? "show d-block" : ""}`}
//         id="staticBackdrop"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex="-1"
//         aria-labelledby="staticBackdropLabel"
//         aria-hidden="true"
//         style={{
//           display: showModal ? "block" : "none",
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//         }} // Dark background
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           {" "}
//           {/* Centered modal */}
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="staticBackdropLabel">
//                 Registration Successful
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//                 onClick={closeModal} // Close modal and navigate to Login page
//               ></button>
//             </div>
//             <div className="modal-body">
//               Your registration has been successfully completed.
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={closeModal}
//               >
//                 Ok
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

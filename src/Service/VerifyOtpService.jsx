import axios from "axios";

async function VerifyOtpService(obj) {
  console.log(obj, "in service obj");
  var res = await axios.post(
    "https://localhost:44324/api/UserAuthentication/VerifyOtp",
    obj
  );
  var response = await res.data;
  return response;
}
export default VerifyOtpService;

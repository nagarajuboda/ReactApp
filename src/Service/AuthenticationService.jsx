import axios from "axios";

async function AuthenticationService(obj) {
  console.log("server before respone", obj);
  const response = await axios.post(
    "https://localhost:44324/api/UserAuthentication/GetOTP",
    obj
  );
  const data = response.data;
  console.log("service After resposeb", data);
  return data;
}
export default AuthenticationService;

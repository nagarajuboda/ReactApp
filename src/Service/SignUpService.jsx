import axios from "axios";

async function SignUpService(obj) {
  console.log("signup service", obj);
  var response = await axios.post(
    "https://localhost:44324/api/UserAuthentication/register",
    obj
  );
  var data = await response.data;
  return data;
}
export default SignUpService;

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import './loginSignup.css'

const signupInitialValues = {
  name: "",
  email: "",
  password: "",
};
const loginInitialvalues = {
  email: "",
  password: "",
};

const LoginSignup = () => {
  const [account, toggleAcount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [showOTPverification, setShowOTPverification] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [login, setLogin] = useState(loginInitialvalues);
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  ////////////////////////////////// TOGGLE BETWEEN LOGIN/SIGNUP//////////////

  const toggleSignup = () => {
    account === "signup" ? toggleAcount("login") : toggleAcount("signup");
    setError("");
  };

  ///////////////////////////// E-MAIL FORMAT VALIDATION ////////////////////

  function isValidEmail(email) {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const gmailPattern = /@gmail\.com$/i;

    return emailPattern.test(email) && gmailPattern.test(email);
  }

  ///////////////////////////////////        SIGNUP           ///////////////////
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    console.log(signup);
    try {
      if (!signup.name || !signup.email || !signup.password) {
        toast.error("Please fill in all details to proceed", {
          theme: "colored",
        });
        return;
      } else if (signup.name.length < 3) {
        toast.error("Name is too short", { theme: "colored" });
        return;
      } else if (!isValidEmail(signup.email)) {
        toast.error("Please provide a valid email address", {
          theme: "colored",
        });
        return;
      } else if (signup.password.length < 4) {
        toast.error("Password is too short", { theme: "colored" });
        return;
      }

      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signup),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        setError("");
        setUserId(data._id);
        setShowOTPverification(true);
      } else {
        if (response.status === 400) {
          toast.error("Email already exists, please login to continue");
        } else {
          setError("Something went wrong! Please try again.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Signup unsuccessful. Please try again.");
    }
  };

  ///////////////////////////////////        OTP VERIFICATION           ///////////////////

  const verificationEmail = async () => {
    try {
      const response = await fetch("http://localhost:8000/emailVerify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, otp }),
      });
      const data = await response.json(); // Parse response data

      console.log(data);

      if (response.ok) {
        // Check if response is successful (status code 2xx)
        setShowOTPverification(false);
        setError("Signup successful");
        toggleAcount("login");
      } else {
        // Handle errors based on response status
        if (response.status === 400) {
          alert("Something went wrong! Please try again.");
        } else {
          alert("Server error. Please try again later.");
        }
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error:", error);
      toast.error("Please enter a valid OTP", { theme: "colored" });
    }
  };

  ///////////////////////////////////     LOGIN        ///////////////////

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    try {
      if (!login.email || !login.password) {
        toast.error("Please fill details to login", { theme: "colored" });
        setError("");
        return;
      }

      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      if (response.ok) {
        const data = await response.json();
        setError("");
        setLogin(loginInitialvalues);
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        navigate(`/selectCourses/${data._id}`);
      } else if (response.status === 400) {
        const data = await response.json();
        setError(data.msg || "Something went wrong! Please try again.");
      } else {
        setError("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("Login unsuccessful. Please try again.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="loginTemp">
          {/****************************** * OTP VERIFICATION*************/}
          {showOTPverification ? (
            <div className="otp-overlay">
              <div className="otp-popup">
                <input
                  value={otp}
                  type="text"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <p>Please enter OTP sent on Email</p>

                <button onClick={() => verificationEmail()}>Verify</button>
                <button className="cancel" onClick={() => setShowOTPverification(false)}>
                  cancel
                </button>
              </div>
            </div>
          ) : /****************************** * LOGIN INPUTS  *************/
          account === "login" ? (
            <div className="login">
              <h4 >WELCOME BACK</h4>
              <input
                
                value={login.email}
                onChange={(e) => onValueChange(e)}
                name="email"
                placeholder="Please Enter Your e-mail"
              />
              <input
                
                value={login.password}
                onChange={(e) => onValueChange(e)}
                name="password"
                type="password"
                placeholder="Please Enter Password"
              />
              {error && <p>{error}</p>}
              <button
                className="loginBtn"
                variant="contained"
                onClick={(e) => loginUser()}
              >
                Login
              </button>
              <p>OR</p>
              <button
                className="signupBtn"
                variant="contained"
                onClick={() => toggleSignup()}
              >
                Create Account
              </button>
            </div>
          ) : (
            /****************************** * SIGNUP INPUTS  *************/
            <div className="signup">
              <h4 >
                Hello! Welcome to Free code camp
              </h4>
              <input
               
                value={signup.name}
                onChange={(e) => onInputChange(e)}
                type="text"
                name="name"
                placeholder="Please Enter Your name"
              />
              <input
               
                value={signup.email}
                onChange={(e) => onInputChange(e)}
                type="email"
                name="email"
                placeholder="Please Enter Your e-mail"
              />
              <input
                
                value={signup.password}
                onChange={(e) => onInputChange(e)}
                type="password"
                name="password"
                placeholder="Create a Password"
              />
              {error && <p>{error}</p>}
              <button
                className="signupBtn"
                variant="contained"
                onClick={() => signupUser()}
              >
                Sign up
              </button>
              <p >OR</p>
              <button
                className="signupBtn"
                variant="contained"
                onClick={() => toggleSignup()}
              >
                Already have an account
              </button>
            </div>
          )}
        </div>

        <ToastContainer />
      </div>
    </>
  );
};
export default LoginSignup;

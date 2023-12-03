import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const userObject = jwtDecode(response.credential); //decode JWT and get user info
    console.log(userObject);

    localStorage.setItem(
      "auth",
      JSON.stringify({
        name: userObject.name,
        email: userObject.email,
        profile: userObject.picture,
      })
    );
    navigate("/student/home");
  };

  return (
    <>

      <section style={{ display : 'flex' , justifyContent : 'center' , alignItems : 'center' , width : '100vw' ,height : '100vh' }} >

        <div className="" style={{ opacity: "1" }}>
          <div className="">
            <GoogleOAuthProvider
              clientId={`983317266916-01juk5ugf6rfg0fop30213s6d0k3atun.apps.googleusercontent.com`}
            >
              <GoogleLogin
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    This is my custom Google button
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              />
            </GoogleOAuthProvider>
          </div>
        </div>

      </section>
    </>
  );
}

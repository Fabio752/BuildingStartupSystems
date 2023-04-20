import React, { useEffect } from "react";
import { baseApiInstance } from "../apis";

const Logout = (props) => {
  useEffect(() => {
    baseApiInstance.get("logout").then((res) => {
      if (res.status === 200) {
        props.setIsSignedIn(false);
        window.location.href = "/";
      }
    });
  }, []);

  return <div>Logging out</div>;
};

export default Logout;

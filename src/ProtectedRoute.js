import React, { useState, useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import { AuthContext } from './helpers/AuthContext.js';
// export const isAuthenticated = () => localStorage.getItem("accessToken") !== null;

function ProtectedRoute({ component: Component, ...rest }) {
  const [authState, setAuthState] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3002/auth/signin", {
  //       headers: {
  //         accessToken: localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data.error) {
  //         setAuthState(false);
  //       } else {
  //         setAuthState(true);
  //       }
  //     });
  // }, []);

//   return (
//     <AuthContext.Provider value={{ authState, setAuthState }}>
//       <Route
//         {...rest}
//         render={(props) => {
//           if (authState) {
//             return <Component />;
//           }
//           else {
//             return (
//               <Redirect to={{ pathname: 'NotFound', state: { from: props.location } }} />
//             );
//           }
//         }}
//       />
//     </AuthContext.Provider>
//   );
}

export default ProtectedRoute;
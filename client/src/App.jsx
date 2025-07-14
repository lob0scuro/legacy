import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Router,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Uploads from "./pages/Uploads";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="success" element={<Success />} />
        <Route path="uploads" element={<Uploads />} />
      </Route>
    )
    // {
    //   basename: "/legacy/",
    // }
  );
  return <RouterProvider router={router} />;
};

export default App;

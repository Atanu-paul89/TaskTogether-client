import { createBrowserRouter } from "react-router";
import CreateAssignments from "../Pages/CreateAssignments";
import MySubmission from "../Pages/MySubmission";
import Pending from "../Pages/Pending";
import ErrorPage from "../Share Components/ErrorPage";
import Register from "../FireBase/Register";
import Login from "../FireBase/Login";
import UpdateProfile from "../Pages/UpdateProfile";
import AssignmentDetails from "../Pages/AssignmentDetails";
import Assignments from "../Pages/Assignments";
import Home from "../Pages/Home";
import MainLayout from "../Pages/MainLayout";
import PrivateRoute from "./PrivateRoute";
import TakeAssignment from "../Pages/TakeAssignment";
import UpdateAssignment from "../Pages/UpdateAssignment";
import About from "../Share Components/About";
import Contact from "../Share Components/Contact";
import Jobs from "../Share Components/Jobs";
import Press from "../Share Components/Press";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'assignments',
        element: <Assignments />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'jobs',
        element: <Jobs />,
      },
      {
        path: 'press',
        element: <Press />,
      },
      {
        path: 'assignment/:id',
        element: <AssignmentDetails />
      },
      {
        path: "/take-assignment/:id",
        element: <PrivateRoute><TakeAssignment /></PrivateRoute>
      },
      {
        path: "/update-assignment/:id", 
        element: <PrivateRoute><UpdateAssignment /></PrivateRoute>
      },
      {
        path: 'createAssignments',
        element: <PrivateRoute><CreateAssignments></CreateAssignments></PrivateRoute>
      },
      {
        path: 'mysubmission',
        element: <PrivateRoute><MySubmission></MySubmission></PrivateRoute>
      },
      {
        path: 'pendingAssignments',
        element: <PrivateRoute><Pending></Pending></PrivateRoute>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'update-profile',
        element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
      },
    ],
    errorElement: <ErrorPage />,
  },
]);


export default router;
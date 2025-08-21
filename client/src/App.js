
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.js"
import Navbar from './component/common/Navbar.js';
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import OpenRoute from "./component/core/Auth/OpenRoute"
import ForgotPassword from './pages/ForgotPassword.js';
import UpdatePassword from './pages/UpdatePassword.js';
import VerifyEmail from './pages/VerifyEmail.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import MyProfile from './component/core/Dashboard.js/MyProfile.js';
import Dashboard from './pages/DashBoard.js';
import PrivateRoute from './component/core/Auth/PrivateRoute.js';
import Error from './pages/Error.js';
import EnrolledCourses from './component/core/Dashboard.js/EnrolledCourses.js';
import Cart from './component/core/Dashboard.js/Cart/index.js';
import { useSelector } from 'react-redux';

import { ACCOUNT_TYPE } from './utils/constants.js';
import AddCourse from './component/core/Dashboard.js/AddCourse/index.js';
import MyCourses from './component/core/Dashboard.js/MyCourses.js';
import EditCourse from './component/core/Dashboard.js/EditCourse/index.js';
import Catalog from './pages/Catalog.js';
import CourseDetails from './pages/CourseDetails.js';
import VideoDetails from './component/core/ViewCourse/VideoDetails.js';
import ViewCourse from './pages/ViewCourse.js';
import Instructor from './component/core/Dashboard.js/Instructor.js';
import Settings from './component/core/Dashboard.js/Settings/index.js';
function App() {
  const { user } = useSelector((state) => state.profile)

  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      {/* <h1 className="text-3xl font-bold text-blue-500">Hello Tailwind</h1> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path='courses/:courseId' element={<CourseDetails />} />

        {/* Open Route - for Only Non Logged in User */}
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        {/* Here we have used an outlet on dashboard so render all that page on dashboard path
       we have to nest the all route inside a single route as given bewol */}
        <Route

          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >   
          {/* nested route */}
          <Route path='/dashboard/my-profile' element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings/>} />


          {
            // we have to check that user account type is student or not
            // then  he can byu the courses 
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses />} />
                <Route path='/dashboard/cart' element={<Cart />} />
              </>
            )
          }


          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}

        </Route>


        {/* For the watching course lectures */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>


        <Route path='*' element={<Error />} />






      </Routes>


    </div>

  );
}

export default App;


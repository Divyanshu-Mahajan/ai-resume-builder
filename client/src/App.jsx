import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'
import Register from './pages/Register';
import Home from './pages/Home'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import DashboardLayout from './Layout/DashboardLayout';
import ResumeForm from './components/ResumeForm';
import PreviewForm from './components/PreviewForm';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from './redux/theme/themeSlice';
import { useEffect } from 'react';
import NotFound from './pages/NotFound';
import TemplatePage from './components/TemplatePage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UserHome from './pages/DashBoardContent/UserHome'
import { loadUserFromStorage } from "./redux/auth/authSlice";
import MyResume from './pages/DashBoardContent/MyResume';
import Statistics from './pages/DashBoardContent/Statistics';
import Suggestions from './pages/DashBoardContent/Suggestions';
import SingleResume from './pages/Resume/SingleResume';
import HowItWorks from './components/HeaderFeature/HowItWorks';
import Features from './components/HeaderFeature/Features';
import Pricing from './components/HeaderFeature/Pricing';
import Testimonials from './components/HeaderFeature/Testimonials';
import AccountSettings from './components/AccountSettings';
import ProtectedRoute from './components/ProtectedRoute';


function App() {

  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.theme.darkMode)

  //Fetch the user from the slice
  const { user, isAuthenticated } = useSelector(state => state?.auth);

  useEffect(() => {

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      dispatch(setTheme(savedTheme === 'dark'));
    }
  }, [dispatch])

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [darkMode]);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);


  //Public Routes which can access anyone

  const publicRoutes = (
    <>
      <Route path='/' element={<Home />} />
      <Route path='features' element={<Features />} />
      <Route path='how-it-works' element={<HowItWorks />} />
      <Route path='pricing' element={<Pricing />} />
      <Route path='testimonial' element={<Testimonials />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />
    </>
  )

  //Protected Routes can access by logged in user
  // const protectedRoutes = isAuthenticated ? (
  //   <>
  //     <Route path='/resume-form' element={<ResumeForm />} />
  //     <Route path='/resume-form/:id' element={<ResumeForm />} />
  //     <Route path='/preview' element={<PreviewForm />} />
  //     <Route path='/templates/:templateName' element={<TemplatePage />} />
  //     <Route path='single-resume/:id' element={<SingleResume />} />
  //     <Route path='account-settings' element={<AccountSettings />} />
  // <Route path='/dashboard' element={<DashboardLayout />}>
  //   <Route index element={<Dashboard />} />
  //   <Route path='home' element={<UserHome />} />
  //   <Route path='my-resume' element={<MyResume />} />
  //   <Route path='statistics' element={<Statistics />} />
  //   <Route path='suggestions' element={<Suggestions />} />
  // </Route>
  //   </>
  // ) : null
  console.log({
    user,
    isAuthenticated
  })

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {publicRoutes}
        {/* protected Routes */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path='home' element={<UserHome />} />
          <Route path='my-resume' element={<MyResume />} />
          <Route path='statistics' element={<Statistics />} />
          <Route path='suggestions' element={<Suggestions />} />
        </Route>

        <Route
          path="/resume-form"
          element={
            <ProtectedRoute>
              <ResumeForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume-form/:id"
          element={
            <ProtectedRoute>
              <ResumeForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preview"
          element={
            <ProtectedRoute>
              <PreviewForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates/:templateName"
          element={
            <ProtectedRoute>
              <TemplatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="single-resume/:id"
          element={
            <ProtectedRoute>
              <SingleResume />
            </ProtectedRoute>
          }
        />
        <Route
          path="account-settings"
          element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path='*' element={<NotFound />} />
      </>
    )
  )


  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>


  )
}

export default App

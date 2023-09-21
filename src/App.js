import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import MainPage from "./pages/mainPage/MainPage";
import AddPage from "./pages/addPage/AddPage";
import PostsPage from "./pages/postsPage/PostsPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import SignInPage from "./pages/signInPage/SignInPage";
import EditPage from "./pages/editPage/EditPage";
import PostPage from "./pages/postPage/PostPage";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { current } from "./redux/auth/operations";
import Profile from "./pages/Profile/Profile";
import OtherUserPost from "./pages/OtherUserPost/OtherUserPost";
import { PrivateRoute } from "./components/AuthRoute/PrivateRoute";
import { PublickRoute } from "./components/AuthRoute/PublicRoute";

import { getIsFetchUser } from "./redux/auth/selectors";
import AllUsers from "./pages/allUsers/AllUsers";
import UserInfoPage from "./pages/UserInfoPage/UserInfoPage";
import { getAllUsers } from "./redux/users/operations";

function App() {
  const dispatch = useDispatch();
  const fetchingUser = useSelector(getIsFetchUser);

  useEffect(() => {
    dispatch(current());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      {!fetchingUser && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/signup"
              element={
                <PublickRoute>
                  <SignUpPage />
                </PublickRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <PublickRoute>
                  <SignInPage />
                </PublickRoute>
              }
            />

            <Route path="/" element={<PrivateRoute />}>
              <>
                <Route index element={<MainPage />} />
                <Route path="posts" element={<PostsPage />} />
                <Route path="/posts/:id" element={<PostPage />} />
                <Route path="/posts/:id/edit" element={<EditPage />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/new" element={<AddPage />} />
                <Route path="/:id/edit" element={<EditPage />} />
                <Route path="/users" element={<AllUsers />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/users/info/:id"
                  element={<UserInfoPage />}
                ></Route>
                <Route path="/users/:id/posts" element={<OtherUserPost />} />
                <Route path="/users/:id/posts/:id" element={<PostPage />} />
              </>
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;

import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <header style={{ height: "30px", background: "black" }}>
        <ul>
          <Link
            to="/startpage/signin"
            style={{ color: "white", textAlign: "center" }}
          >
            signUp
          </Link>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default MainLayout;

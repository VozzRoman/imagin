import { Link, Outlet } from "react-router-dom";

const RegistrPage = () => {
  return (
    <>
      <heade>
        <ul>
          <Link>signin</Link>
        </ul>
      </heade>
      <Outlet />
    </>
  );
};
export default RegistrPage;

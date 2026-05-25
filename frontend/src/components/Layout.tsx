import { Outlet } from "react-router";
import { Navbar } from "./Navbar";

export const Layout = ({ data }: { data: object | null }) => {
  return (
    <>
      <header>
        <Navbar data={data} />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

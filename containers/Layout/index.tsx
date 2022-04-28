import Menu from "../../components/Menu";
import s from "./style.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={s.layout}>
      <Menu />
      <main className={s.main}>{children}</main>
      <aside className={s.search}>SEARCH</aside>
    </div>
  );
};

export default Layout;

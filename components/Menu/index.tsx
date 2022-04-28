import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useContext } from "react";
import AppContext from "../../containers/AppProvider/AppContext";
import items from "./items";
import { MenuButton } from "./MenuButton";
import s from "./style.module.scss";

const Menu = () => {
  const { layoutState, setLayoutState } = useContext(AppContext);
  const isOpen = layoutState === "menu";
  return (
    <aside className={s.wrapper}>
      <AnimatePresence>
        {isOpen && (
          <nav>
            <ul>
              {items.map(
                (item) =>
                  !item.disable && (
                    <Link key={item.name} href={item.href}>
                      {item.name}
                    </Link>
                  )
              )}
            </ul>
          </nav>
        )}
      </AnimatePresence>
      <div className={s.buttonWrapper}>
        <MenuButton
          isOpen={isOpen}
          onClick={() =>
            setLayoutState((state) =>
              state === "default" ? "menu" : "default"
            )
          }
        />
        <div className={s.rotate}>
          <span className={s.inner}>MENU</span>
        </div>
      </div>
    </aside>
  );
};

export default Menu;

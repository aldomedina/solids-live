import cn from "classnames";
import s from "./style.module.scss";

type Style = "primary" | "secondary";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  btnStyle?: Style;
}

function Button({ children, btnStyle = "primary", ...props }: Props) {
  return (
    <button className={cn(s.button, s[btnStyle])} {...props}>
      {children}
    </button>
  );
}

export default Button;

export type Icons =
  | "close"
  | "copy"
  | "tick"
  | "full-screen"
  | "new-window"
  | "chevron-up"
  | "chevron-down"
  | "twitter"
  | "solid"
  | "download"
  | "opensea"
  | "search"
  | "discord";

export type IconSize = "sm" | "md" | "lg" | "xl";

export type IconProps = {
  className?: string;
  icon: Icons;
  size?: IconSize;
};

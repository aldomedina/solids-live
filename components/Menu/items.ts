interface IITem {
  name: string;
  href: string;
  disable?: boolean;
}

const items: IITem[] = [
  {
    name: "home",
    href: "/",
  },
  {
    name: "about",
    href: "/about",
  },
  {
    name: "faq",
    href: "/faq",
  },
  {
    name: "mint",
    href: "/mint",
    disable: true,
  },
];

export default items;

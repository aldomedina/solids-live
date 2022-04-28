import React from "react";
import { motion } from "framer-motion";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  isOpen?: boolean;
}
const width = 16;
const height = 12;

const MenuButton = ({ isOpen, ...props }: Props) => {
  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 2,
    },
  };
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -2,
    },
  };
  const lineProps = {
    stroke: "currentColor",
    strokeWidth: 2,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    transition: { ease: "easeOut", duration: 0.2 },
  };
  const unitHeight = 4;
  const unitWidth = (unitHeight * width) / height;

  return (
    <button {...props}>
      <motion.svg
        viewBox={`0 0 ${unitWidth} ${unitHeight}`}
        overflow="visible"
        preserveAspectRatio="none"
        width={width}
        height={height}
      >
        <motion.line
          x1="0"
          x2={unitWidth}
          y1="0"
          y2="0"
          variants={top}
          animate={isOpen ? "opened" : "closed"}
          {...lineProps}
        />
        <motion.line
          x1="0"
          x2={unitWidth}
          y1="2"
          y2="2"
          variants={center}
          animate={isOpen ? "opened" : "closed"}
          {...lineProps}
        />
        <motion.line
          x1="0"
          x2={unitWidth}
          y1="4"
          y2="4"
          variants={bottom}
          animate={isOpen ? "opened" : "closed"}
          {...lineProps}
        />
      </motion.svg>
    </button>
  );
};

export { MenuButton };

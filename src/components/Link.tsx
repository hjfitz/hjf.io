import React from "react";
import { GatsbyLinkProps, Link as GatsbyLink } from "gatsby";

// why, gatsby
interface LinkProps extends Omit<GatsbyLinkProps<{}>, "ref"> {
  href: string;
}

const Link = ({ href, ...rest }: LinkProps) => {
  if (href && href.indexOf("/") === 0) {
    return <GatsbyLink {...rest} to={href} />;
  }
  return <a {...{ ...rest, href }} />;
};

export default Link;

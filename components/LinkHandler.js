import Link from "next/link";

const LinkHandler = ({ href, external, children }) => {
  // If this is an external button or a button without link, we do not need
  // to use the NextJS Link component
  if (!href || external) return <>{children}</>;

  return (
    <Link href={href} passHref>
      {children}
    </Link>
  );
};

export default LinkHandler;

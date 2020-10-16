import Linkify from "react-linkify";

// Automatically add links in the text and format them as external links,
// opening in a new tab
const ExternalLinkify = ({ children }) => (
  <Linkify
    componentDecorator={(decoratedHref, decoratedText, key) => (
      <a target="_blank" href={decoratedHref} key={key}>
        {decoratedText}
      </a>
    )}
    children={children}
  />
);

export default ExternalLinkify;

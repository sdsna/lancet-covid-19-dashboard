import getTheme from "helpers/getTheme";
import { css } from "styled-components";

const { breakpoints } = getTheme();

// creates a media query and a container content query for the provided
// breakpoint and the given CSS tagged template literal.
const contentSizeQuery = (size) => {
  return function (strings, ...expressions) {
    const styles = css(strings, ...expressions);

    switch (size) {
      // the default styles
      // Note that each breakpoint can only show content up to a maximum size.
      // For example, on an MD-sized viewport (< 1280px), the user can only
      // see styles for #content.small and #content.medium.
      // The #content.large styles are only available for viewports >= 1280px.
      case "small":
        return css`
          ${breakpoints.up("xs")} {
            #content &,
            #content.small & {
              ${styles}
            }
          }
        `;
      case "medium":
        return css`
          ${breakpoints.up("sm")} {
            #content &,
            #content.medium & {
              ${styles}
            }
          }
        `;
      case "large":
        return css`
          ${breakpoints.up("md")} {
            #content &,
            #content.large & {
              ${styles}
            }
          }
        `;
      case "small-only":
        return css`
          ${breakpoints.down("sm")} {
            #content & {
              ${styles}
            }
          }

          #content.small & {
            ${styles}
          }
        `;
      case "medium-down":
        return css`
          ${breakpoints.down("sm")} {
            #content & {
              ${styles}
            }
          }

          #content.small &,
          #content.medium & {
            ${styles}
          }
        `;
    }
  };
};

export default contentSizeQuery;

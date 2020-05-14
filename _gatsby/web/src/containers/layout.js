import { graphql, StaticQuery } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/layout";

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      openGraph {
        title
        description
        image {
          ...SanityImage
          alt
        }
      }
    }
  }
`;

function LayoutContainer(props) {
  const [showNav, setShowNav] = useState(true);
  function handleShowNav() {
    setShowNav(true);
  }
  function handleHideNav() {
    setShowNav(false);
  }

  const { textWhite = false } = props;

  return (
    <StaticQuery
      query={query}
      render={(data) => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the Studio at http://localhost:3333 and some content in "Site settings"'
          );
        }
        console.log('data.site', data.site)
        return (
          <Layout
            {...props}
            showNav={showNav}
            footerNav={data.site.footerMenu}
            siteTitle={data.site.title}
            siteLogo={data.site.openGraph.image}
            backgroundColor={data.site.bgColor}
            onHideNav={handleHideNav}
            onShowNav={handleShowNav}
            textWhite={textWhite}
          />
        );
      }}
    />
  );
}

export default LayoutContainer;
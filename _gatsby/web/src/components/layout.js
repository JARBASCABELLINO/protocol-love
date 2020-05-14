import React from "react";
import Header from "./header";
import Footer from "./footer";
import "../styles/layout.css";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.toggleBodyClass);
    this.toggleBodyClass();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.toggleBodyClass);
  }

  toggleBodyClass = () => {
    if (this.state.scrolled && window.scrollY <= 10) {
      this.setState({ scrolled: false });
    } else if (!this.state.scrolled && window.scrollY > 10) {
      this.setState({ scrolled: true });
    }
  };

  render() {
    const {
      children,
      onHideNav,
      onShowNav,
      showNav,
      siteTitle,
      siteLogo,
      navMenuItems,
      footerMenuItems,
      textWhite = true,
    } = this.props;
    const { scrolled } = this.state;
    return (
      <>
        <Header
          navMenuItems={navMenuItems}
          siteTitle={siteTitle}
          siteLogo={siteLogo}
          onHideNav={onHideNav}
          onShowNav={onShowNav}
          showNav={showNav}
          scrolled={scrolled}
          textWhite={textWhite}
        />
        <>{children}</>
        <Footer siteTitle={siteTitle} footerMenuItems={footerMenuItems} />
      </>
    );
  }
}

export default Layout;
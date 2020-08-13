import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "assets/img/HEXAWARE_LOGO.png";
import logo from "assets/img/reactlogo.png";
import { useHistory } from "react-router-dom";
let ps;


const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);


let history = useHistory();

const isRouteAllowed = () => {
    let user = JSON.parse(localStorage.getItem('TOAST_USER'))
    if (user.roles[0] === "ROLE_ADMIN") {
    }
    else if (user.roles[0] === "ROLE_TIME_KEEPER") { }
    else {
        if ("/admin/dashboard" === window.location.pathname) {
        }
        else
            history.push("/")
    }
}
    const getTimeKeeperRoutes = () => {
        let timeKeeperRoutes = []
        routes.forEach(element => {
            if (element.path === "/currentSession" || element.path === "/dashboard")
                timeKeeperRoutes.push(element)
        });
        return timeKeeperRoutes
    }

const getAllowedRoutes = () => {
    let user = JSON.parse(localStorage.getItem('TOAST_USER'))
    
    if (user.roles[0] === "ROLE_ADMIN") {
        return routes
    }
    else if (user.roles[0] === "ROLE_TIME_KEEPER") {
        
        return getTimeKeeperRoutes()
    }
    else {
        return routes.slice(0, 1)
    }
}

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
    React.useEffect(() => {
        const isLogin = localStorage.getItem('TOAST_IS_LOGGED') === 'true';
    if (!isLogin)
        history.push("/");
    isRouteAllowed()
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
              routes={getAllowedRoutes()}
              logoText={"Toast Hexaware"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
                  routes={getAllowedRoutes()}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        
        { (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) }
        
      
      </div>
    </div>
  );
}

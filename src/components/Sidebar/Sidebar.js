/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
 
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
    const { color, logo, image, logoText, routes } = props;
  
    const handleClick = (path,e) => {
       
    }    
  
    const getLinks = () => {
      
        //toshow.slice(0,1)
        var links = (
            <List className={classes.list}>
                {routes.map((prop, key) => {
                    var activePro = " ";
                    var listItemClasses;
                    if (prop.path === "/upgrade-to-pro") {
                        activePro = classes.activePro + " ";
                        listItemClasses = classNames({
                            [" " + classes[color]]: true
                        });
                    } else {
                        listItemClasses = classNames({
                            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
                        });
                    }
                    const whiteFontClasses = classNames({
                        [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
                    });
                    return (
                        <NavLink
                            to={prop.layout + prop.path}
                            onClick={e => handleClick(prop.path,e)}
                            className={activePro + classes.item}
                            activeClassName="active"
                            key={key}
                        >
                            <ListItem button className={classes.itemLink + listItemClasses}>
                                {typeof prop.icon === "string" ? (
                                    <Icon
                                        className={classNames(classes.itemIcon, whiteFontClasses, {
                                            [classes.itemIconRTL]: props.rtlActive
                                        })}
                                    >
                                        {prop.icon}
                                    </Icon>
                                ) : (
                                        <prop.icon
                                            className={classNames(classes.itemIcon, whiteFontClasses, {
                                                [classes.itemIconRTL]: props.rtlActive
                                            })}
                                        />
                                    )}
                                <ListItemText
                                    primary={props.rtlActive ? prop.rtlName : prop.name}
                                    className={classNames(classes.itemText, whiteFontClasses, {
                                        [classes.itemTextRTL]: props.rtlActive
                                    })}
                                    disableTypography={true}
                                />
                            </ListItem>
                        </NavLink>
                    );
                })}
            </List>
        );
        return links;
    }
  var brand = (
    <div className={classes.logo}>
      <a
        href="#"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
    
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
                  <div className={classes.sidebarWrapper}>{getLinks()}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}



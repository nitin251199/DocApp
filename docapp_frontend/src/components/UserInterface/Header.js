import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { useSelector } from "react-redux";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Person, PinDropSharp, ShoppingBasket, Translate } from "@material-ui/icons";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import { Icon } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  cartButton: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  title: {
    animation: '$pulse 2s infinite',
    [theme.breakpoints.up("sm")]: {
      display: "block",
      fontWeight: "bolder",
      fontSize: "2.0rem",
      color: "#3f51b5"
    },
  },
  '@keyframes pulse' : {
    '0%,100%':  {
      color: "#3f51b5"
    },
    '50%' : {
      transform: "scale(1.05)",
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();

  var user = useSelector((state) => state.user);
  var userValue = Object.values(user);
  var userKey = Object.keys(user);

  var doc = useSelector((state) => state.doctor);
  var docValue = Object.values(doc);
  var docKey = Object.keys(doc);

  var meds = JSON.parse(sessionStorage.getItem("medicines"));
  var u = JSON.parse(sessionStorage.getItem("userdetails"));
  if (u) {
    var uKey = Object.keys(u);
  } else {
    uKey = 0;
  }
  var d = JSON.parse(sessionStorage.getItem("docdetails"));
  if (d) {
    var dKey = Object.keys(d);
  } else {
    dKey = 0;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Login</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const [loginAnchor, setLoginAnchor] = React.useState(null);
  const [logoutAnchor, setLogoutAnchor] = React.useState(null);
  const loginOpen = Boolean(loginAnchor);
  const logoutOpen = Boolean(logoutAnchor);
  const handleLogin = (event) => {
    setLoginAnchor(event.currentTarget);
  };

  const handleLogout = (event) => {
    setLogoutAnchor(event.currentTarget);
  };

  const handleDoctorLogin = () => {
    props.history.push({ pathname: "/login" }, { loginType: "doctor" });
    setLoginAnchor(null);
  };
  const handlePatientLogin = () => {
    props.history.push({ pathname: "/login" }, { loginType: "patient" });
    setLoginAnchor(null);
  };

  const loginArea = () => {
    if (uKey.length > 0) {
      if (dKey.length > 0) {
        return (
          <span onMouseEnter={(event) => handleLogout(event)}>
            {d.doctorname}
          </span>
        );
      }
      return (
        <span onMouseEnter={(event) => handleLogout(event)}>{u.username}</span>
      );
    } else if (dKey.length > 0) {
      if (uKey.length > 0) {
        return (
          <span onMouseEnter={(event) => handleLogout(event)}>
            {u.username}
          </span>
        );
      }
      return (
        <span onMouseEnter={(event) => handleLogout(event)}>
          {d.doctorname}
        </span>
      );
    } else {
      return (
        <span aria-controls="mysimple-menu" onMouseOver={handleLogin}>
          Login
        </span>
      );
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="#fff">
        <Toolbar>
          <IconButton>
            <img src="/docConsultblue.jpg" width="50" />
          </IconButton>
          &nbsp;
          <div className={classes.title} noWrap>
            <a href="/">E-Consult</a>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button
              onClick={() => {
                uKey.length > 0
                  ? props.history.push("/appointment-page")
                  : props.history.push(
                      { pathname: "/login" },
                      { loginType: "patient" }
                    );
              }}
              color="primary"
              variant="contained"
              style={{
                textTransform: "capitalize",
                margin: 10,
                padding: 15,
                borderRadius: 3,
                fontWeight: 600,
              }}
            >
              Make an Appointment
            </Button>
            {(uKey.length || dKey.length > 0) && (
              <Button
                style={{
                  paddingInline: 10,
                }}
                onClick={() => {
                  uKey.length > 0
                    ? props.history.push("/userprofile2")
                    : dKey.length > 0
                    ? props.history.push("/docprofile2")
                    : props.history.push(
                        { pathname: "/login" },
                        { loginType: "patient" }
                      );
                }}
              >
                {/* a ? b : (c ? d : e) */}
                <b>My Appointments</b>
              </Button>
            )}
            <Button
              style={{
                paddingInline: 10,
              }}
              onClick={() => props.history.push("/displayblogs")}
            >
              <b>Blogs</b>
            </Button>

            <Button
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
              <label
                style={{ fontSize: 16, margin: 4, textTransform: "capitalize" }}
              >
                {loginArea()}
              </label>
            </Button>
            <Menu
              anchorEl={logoutAnchor}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={logoutOpen}
              onClose={() => setLogoutAnchor(null)}
            >
              <MenuItem
                onClick={() => {
                  sessionStorage.clear();
                  props.history.replace("/");
                }}
              >
                Logout
              </MenuItem>
            </Menu>
            <Menu
              id="mysimple-menu"
              autoFocus={false}
              anchorEl={loginAnchor}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              open={loginOpen}
              onClose={() => setLoginAnchor(null)}
            >
              <MenuItem onClick={() => handleDoctorLogin()}>
                <IconButton color="inherit">
                  <LocalHospitalIcon />
                </IconButton>
                <p>As Doctor</p>
              </MenuItem>
              <MenuItem onClick={() => handlePatientLogin()}>
                <IconButton color="inherit">
                  <Person />
                </IconButton>
                <p>As Patient</p>
              </MenuItem>
            </Menu>
            <IconButton
              onClick={() => {
                uKey.length > 0
                  ? props.history.push("/cart")
                  : props.history.push(
                      { pathname: "/login" },
                      { loginType: "patient" }
                    );
              }}
            >
              {/* { meds.length > 0 && <Badge color="secondary" overlap="circular" badgeContent={meds.length}><ShoppingBasket /></Badge>} */}
              <ShoppingBasket />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import {
  Drawer,
  List,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Tooltip,
  Avatar
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import MessagePopperButton from "./navigation/messages/MessagePopperButton";
import ContentArea from "./ContentArea";
import SideDrawer from "./navigation/sideDrawer/SideDrawer";
import ConsecutiveSnackbarMessages from "../../shared/ConsecutiveSnackbarMessages";
import smoothScrollTop from "../../shared/smoothScrollTop";
import Balance from "./navigation/navbar/Balance";
import persons from "../dummy_data/persons";

const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[6],
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 0
    }
  },
  contentArea: {
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0
    }
  },
  drawerPaper: {
    height: "100%vh",
    whiteSpace: "nowrap",
    border: 0,
    width: theme.spacing(7),
    overflowX: "hidden",
    marginTop: 64,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    },
    backgroundColor: theme.palette.common.black
  },
  appBarToolbar: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: 56
    }
  },
  addAccountAvatar: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5)
    }
  },
  smBordered: {
    [theme.breakpoints.down("xs")]: {
      borderRadius: "50% !important"
    }
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.text.primary
  },
  drawerMobile: {
    backgroundColor: theme.palette.common.black
  },
  defaultListItemPadding: {
    paddingTop: 11,
    paddingBottom: 11
  },
  iconListItem: {
    width: "auto",
    borderRadius: theme.shape.borderRadius,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  textPrimary: {
    color: theme.palette.text.primary
  },
  mobileItemSelected: {
    backgroundColor: `${theme.palette.primary.main} !important`
  }
});

class Main extends PureComponent {
  state = {
    mobileOpen: false,
    selectedTab: null,
    CardChart: null,
    EmojiTextArea: null,
    ImageCroppr: null,
    Dropzone: null,
    DateTimePicker: null,
    transactions: [],
    statistics: [],
    scheduledPosts: [],
    targets: [],
    messages: [],
    isAccountActivated: false
  };

  checkedOnceForOpeningAccountModal = false;

  componentDidMount() {
    this.selectCorrectMenuItem();
    this.fetchRandomTargets();
    this.fetchRandomStatistics();
    this.fetchRandomTransactions();
    this.fetchRandomMessages();
    this.fetchRandomPosts();
    /**
     * Close mobile drawer when resizing to bigger width
     */
    window.onresize = () => {
      const { width } = this.props;
      const { mobileOpen } = this.state;
      if (isWidthUp("sm", width) && mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    };
  }

  fetchRandomTargets = () => {
    const targets = [];
    for (let i = 0; i < 35; i += 1) {
      const randomPerson = persons[Math.floor(Math.random() * persons.length)];
      const target = {
        id: i,
        number1: Math.floor(Math.random() * 251),
        number2: Math.floor(Math.random() * 251),
        number3: Math.floor(Math.random() * 251),
        number4: Math.floor(Math.random() * 251),
        name: randomPerson.name,
        profilePicUrl: randomPerson.profilePicUrl,
        isActivated: Math.round(Math.random()) ? true : false
      };
      targets.push(target);
    }
    this.setState({ targets });
  };

  fetchRandomStatistics = () => {
    const statistics = [];
    const iterations = 300;
    const oneYearSeconds = 60 * 60 * 24 * 365;
    let curProfit = Math.round(3000 + Math.random() * 1000);
    let curViews = Math.round(3000 + Math.random() * 1000);
    let curUnix = Math.round(new Date().getTime() / 1000) - oneYearSeconds;
    for (let i = 0; i < iterations; i += 1) {
      curUnix += Math.round(oneYearSeconds / iterations);
      curProfit += Math.round((Math.random() * 2 - 1) * 10);
      curViews += Math.round((Math.random() * 2 - 1) * 10);
      statistics.push({
        views: curViews,
        profit: curProfit,
        timestamp: curUnix
      });
    }
    this.setState({ statistics });
  };

  fetchRandomTransactions = () => {
    const transactions = [];
    const iterations = 32;
    const oneMonthSeconds = Math.round(60 * 60 * 24 * 30.5);
    const transactionTemplates = [
      {
        description: "Starter subscription",
        isSubscription: true,
        balanceChange: -1499
      },
      {
        description: "Premium subscription",
        isSubscription: true,
        balanceChange: -2999
      },
      {
        description: "Business subscription",
        isSubscription: true,
        balanceChange: -4999
      },
      {
        description: "Tycoon subscription",
        isSubscription: true,
        balanceChange: -9999
      },
      {
        description: "Added funds",
        isSubscription: false,
        balanceChange: 2000
      },
      {
        description: "Added funds",
        isSubscription: false,
        balanceChange: 5000
      }
    ];
    let curUnix = Math.round(
      new Date().getTime() / 1000 - iterations * oneMonthSeconds
    );
    for (let i = 0; i < iterations; i += 1) {
      const randomTransactionTemplate =
        transactionTemplates[
          Math.floor(Math.random() * transactionTemplates.length)
        ];
      const transaction = {
        id: i,
        description: randomTransactionTemplate.description,
        balanceChange: randomTransactionTemplate.balanceChange,
        paidUntil: curUnix + oneMonthSeconds,
        timestamp: curUnix
      };
      curUnix += oneMonthSeconds;
      transactions.push(transaction);
    }
    transactions.reverse();
    this.setState({ transactions });
  };

  fetchRandomMessages = () => {
    const messages = [];
    const iterations = 8;
    const oneDaySeconds = 60 * 60 * 24;
    let curUnix = Math.round(
      new Date().getTime() / 1000 - iterations * oneDaySeconds
    );
    for (let i = 0; i < iterations; i += 1) {
      const randomPerson = persons[Math.floor(Math.random() * persons.length)];
      const message = {
        id: i,
        profilePicUrl: randomPerson.profilePicUrl,
        date: curUnix,
        text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed."
      };
      curUnix += oneDaySeconds;
      messages.push(message);
    }
    messages.reverse();
    this.setState({ messages });
  };

  fetchRandomPosts = () => {
    const posts = [];
    const iterations = 15;
    const oneDaySeconds = 60 * 60 * 24;
    let curUnix = Math.round(
      new Date().getTime() / 1000 - iterations * oneDaySeconds
    );
    for (let i = 0; i < iterations; i += 1) {
      const randomPerson = persons[Math.floor(Math.random() * persons.length)];
      const post = {
        id: i,
        src: randomPerson.profilePicUrl,
        timestamp: curUnix
      };
      curUnix += oneDaySeconds;
      posts.reverse();
      posts.push(post);
    }
    this.setState({ scheduledPosts: posts });
  };

  /**
   * Logs the user out from the website and refreshes the page
   */
  logout = () => {
    const { setLoggedOut } = this.props;
    setLoggedOut();
  };

  /**
   * Toggles the drawer on the left side when the width of the device is small and
   * therefore the mobile drawer is open.
   */
  handleMobileDrawerToggle = () => {
    const { mobileOpen } = this.state;
    if (mobileOpen) {
      this.setState({ mobileOpen: false });
    } else {
      this.setState({ mobileOpen: true });
    }
  };

  /**
   * We have to call the pushSnackBarMessage function of this
   * child's consecutiveSnackbarMessages component. Thats why we pass it
   * when the component did mount to this components state.
   */
  getPushMessageFunctionFromChildComponent = pushFunction => {
    this.pushMessageToSnackbar = pushFunction;
  };

  /** After a click on the 'activate' button in the dashboard
   * the activation status of the account
   */
  toggleAccountActivation = () => {
    const { isAccountActivated } = this.state;
    if (isAccountActivated) {
      this.pushMessageToSnackbar({
        text: "Your account is now deactivated."
      });
    } else {
      this.pushMessageToSnackbar({
        text: "Your account is now activated."
      });
    }
    this.setState({ isAccountActivated: !isAccountActivated });
  };

  /**
   * This couldve been cleaner with calling the matching function
   * inside PropsRouters child componentDidMount() method,
   * but it made trouble rendering the PropsRoute component.
   */
  selectCorrectMenuItem = () => {
    const url = window.location.href;
    if (url.includes("/schedule-posts")) {
      this.selectSchedulePosts();
    } else if (url.includes("/subscription")) {
      this.selectSubscription();
    } else {
      this.selectDashboard();
    }
  };

  selectDashboard = () => {
    smoothScrollTop();
    document.title = "WaVer - Dashboard";
    this.setState({
      selectedTab: "Dashboard"
    });
    if (!this.hasFetchedCardChart) {
      this.hasFetchedCardChart = true;
      import("../../shared/CardChart").then(Component => {
        this.setState({ CardChart: Component.default });
      });
    }
  };

  selectSchedulePosts = () => {
    smoothScrollTop();
    document.title = "WaVer - Upload Post";
    this.setState({
      selectedTab: "Schedule Posts"
    });
    if (!this.hasFetchedEmojiTextArea) {
      this.hasFetchedEmojiTextArea = true;
      import("../../shared/EmojiTextArea").then(Component => {
        this.setState({ EmojiTextArea: Component.default });
      });
    }
    if (!this.hasFetchedImageCroppr) {
      this.hasFetchedImageCroppr = true;
      import("../../shared/ImageCroppr").then(Component => {
        this.setState({ ImageCroppr: Component.default });
      });
    }
    if (!this.hasFetchedDropzone) {
      this.hasFetchedDropzone = true;
      import("../../shared/Dropzone").then(Component => {
        this.setState({ Dropzone: Component.default });
      });
    }
    if (!this.hasFetchedDateTimePicker) {
      this.hasFetchedDateTimePicker = true;
      import("../../shared/DateTimePicker").then(Component => {
        this.setState({ DateTimePicker: Component.default });
      });
    }
  };

  selectSubscription = () => {
    smoothScrollTop();
    document.title = "WaVer - Subscription";
    this.setState({
      selectedTab: "Subscription"
    });
  };

  render() {
    const { classes, width } = this.props;
    const {
      selectedTab,
      mobileOpen,
      ImageCroppr,
      EmojiTextArea,
      CardChart,
      Dropzone,
      DateTimePicker,
      transactions,
      statistics,
      scheduledPosts,
      targets,
      isAccountActivated,
      messages
    } = this.state;
    const menuItems = [
      {
        link: "/dashboard",
        name: "Dashboard",
        onClick: () => {
          this.handleMobileDrawerToggle();
          this.selectDashboard();
        },
        icon: {
          desktop: (
            <DashboardIcon
              className={
                selectedTab === "Dashboard" ? "text-primary" : "text-white"
              }
              fontSize="small"
            />
          ),
          mobile: (
            <DashboardIcon
              className={selectedTab === "Dashboard" ? "text-white" : null}
            />
          )
        }
      },
      {
        link: "/schedule-posts",
        name: "Schedule Posts",
        onClick: () => {
          this.handleMobileDrawerToggle();
          this.selectSchedulePosts();
        },
        icon: {
          desktop: (
            <ScheduleIcon
              className={
                selectedTab === "Schedule Posts" ? "text-primary" : "text-white"
              }
              fontSize="small"
            />
          ),
          mobile: (
            <ScheduleIcon
              className={selectedTab === "Schedule Posts" ? "text-white" : null}
              fontSize="small"
            />
          )
        }
      },
      {
        link: "/subscription",
        name: "Subscription",
        onClick: () => {
          this.handleMobileDrawerToggle();
          this.selectSubscription();
        },
        icon: {
          desktop: (
            <AccountBalanceIcon
              className={
                selectedTab === "Subscription" ? "text-primary" : "text-white"
              }
              fontSize="small"
            />
          ),
          mobile: (
            <AccountBalanceIcon
              className={selectedTab === "Subscription" ? "text-white" : null}
              fontSize="small"
            />
          )
        }
      }
    ];
    return (
      <Fragment>
        <ConsecutiveSnackbarMessages
          getPushMessageFunctionFromChildComponent={
            this.getPushMessageFunctionFromChildComponent
          }
        />
        <AppBar
          position="sticky"
          className={classNames("bg-white", classes.appBar)}
        >
          <Toolbar
            className={classNames(
              classes.appBarToolbar,
              "d-flex justify-content-between"
            )}
          >
            <div className="d-flex align-items-center">
              <Hidden smUp>
                <IconButton
                  onClick={this.handleMobileDrawerToggle}
                  className="mr-1"
                  color="primary"
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Hidden xsDown>
                <Typography
                  variant="h4"
                  style={{
                    fontFamily: "'Baloo Bhaijaan', cursive",
                    fontWeight: 400
                  }}
                >
                  <span className="text-primary">Wa</span>
                  <span className="text-secondary">Ver</span>
                </Typography>
              </Hidden>
            </div>
            <div className="d-flex justify-content-end w-100 align-items-center">
              {isWidthUp("sm", width) && <Balance balance={2573} />}
              <MessagePopperButton messages={messages} />
              <ListItem
                disableGutters
                className={classNames(classes.iconListItem, classes.smBordered)}
              >
                <Avatar
                  alt=""
                  src="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                  className={classNames(
                    "bg-secondary-main avatar-24",
                    classes.addAccountAvatar
                  )}
                />
                {isWidthUp("sm", width) && (
                  <ListItemText
                    className="pl-0 pr-2"
                    primary={
                      <span className={classes.textPrimary}>Username</span>
                    }
                  />
                )}
              </ListItem>
            </div>
            <div className="d-flex align-items-center">
              <SideDrawer />
            </div>
          </Toolbar>
        </AppBar>
        <main className={classNames(classes.contentArea)}>
          <ContentArea
            isAccountActivated={isAccountActivated}
            ImageCroppr={ImageCroppr}
            EmojiTextArea={EmojiTextArea}
            CardChart={CardChart}
            Dropzone={Dropzone}
            DateTimePicker={DateTimePicker}
            handleNumberChange={this.handleNumberChange}
            handleSwitchToggle={this.handleSwitchToggle}
            handleSelectChange={this.handleSelectChange}
            toggleAccountActivation={this.toggleAccountActivation}
            pushMessageToSnackbar={this.pushMessageToSnackbar}
            selectDashboard={this.selectDashboard}
            selectSchedulePosts={this.selectSchedulePosts}
            selectSubscription={this.selectSubscription}
            transactions={transactions}
            statistics={statistics}
            scheduledPosts={scheduledPosts}
            targets={targets}
          />
        </main>
        <Hidden xsDown>
          <Drawer //  both drawers can be combined into one for performance
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
            open={false}
          >
            <List>
              {menuItems.map(element => (
                <Tooltip
                  title={element.name}
                  placement="right"
                  key={element.name}
                >
                  <Link
                    to={element.link}
                    className={classes.menuLink}
                    onClick={element.onClick}
                  >
                    <ListItem
                      selected={selectedTab === element.name}
                      button
                      divider
                      className="justify-content-center"
                    >
                      <ListItemIcon className="justify-content-center">
                        {element.icon.desktop}
                      </ListItemIcon>
                    </ListItem>
                  </Link>
                </Tooltip>
              ))}
              <Tooltip title="Logout" placement="right">
                <ListItem
                  button
                  onClick={this.logout}
                  className="justify-content-center"
                >
                  <ListItemIcon className="justify-content-center">
                    <PowerSettingsNewIcon
                      className="text-white"
                      fontSize="small"
                    />
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
            </List>
          </Drawer>
        </Hidden>
        <Hidden
          smUp /* Here for a bug when u max the window the resize event wont fire */
        >
          <Drawer
            variant="temporary"
            onClose={this.handleMobileDrawerToggle}
            open={mobileOpen}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <List disablePadding>
              <ListItem divider style={{ height: 56 }} disableGutters>
                <ListItemIcon className="ml-1">
                  <IconButton onClick={this.handleMobileDrawerToggle}>
                    <CloseIcon color="primary" />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            </List>
            <List disablePadding className="h-100">
              {menuItems.map(element => (
                <Link
                  to={element.link}
                  className={classes.menuLink}
                  onClick={element.onClick}
                  key={element.name}
                >
                  <ListItem
                    button
                    className={
                      selectedTab === element.name
                        ? classes.mobileItemSelected
                        : null
                    }
                  >
                    <ListItemIcon>{element.icon.mobile}</ListItemIcon>
                    <ListItemText
                      primary={element.name}
                      className={
                        selectedTab === element.name ? "text-white" : null
                      }
                    />
                  </ListItem>
                </Link>
              ))}
              <ListItem button onClick={this.logout}>
                <ListItemIcon>
                  <PowerSettingsNewIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>
        </Hidden>
      </Fragment>
    );
  }
}

Main.propTypes = {
  width: PropTypes.string.isRequired,
  setLoggedOut: PropTypes.func,
  classes: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles, { withTheme: true })(Main));
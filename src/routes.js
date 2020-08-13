// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import ScheduleSession from "views/ScheduleSession/ScheduleSession.js";
import GenerateAgenda from "views/GenerateAgenda/GenerateAgenda.js";
//import UpdateAgendaSections from "views/Timing/AgendaTiming.js";
import App from "views/Timing/TimingApp.js";
import TimeKeeper from "views/CurrentSession/TimeKeeper.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/schedulesession",
    name: "Schedule Session",
    rtlName: "",
    icon: MeetingRoomIcon,
    component: ScheduleSession,
    layout: "/admin"
  },
  {
    path: "/generateagenda",
    name: "Generate Agenda",
    rtlName: "",
    icon: AttachFileIcon,
    component: GenerateAgenda,
    layout: "/admin"
  },
  {
    path: "/updatetiming",
    name: "Update Agenda Timings",
    rtlName: "",
    icon: BuildOutlinedIcon,
    component: App , //UpdateAgendaSections,
    layout: "/admin"
  },
  {
    path: "/currentSession",
    name: "Current Session",
    rtlName: "",
    icon: MeetingRoomIcon,
    component: TimeKeeper,
    layout: "/admin"
  }
];



export default dashboardRoutes;

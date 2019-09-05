// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Company from "views/Company/Company.jsx";
import CreateCompany from "../components/Company/CreateCompany/CreateCompany";
import User from "../views/User/User";
import ChartOfAccounts from "../views/ChartOfAccounts/ChartOfAccounts";
import CostCenters from "../views/CostCenters/CostCenters";
import Assets from "../views/Assets/Assets";
import ThirdParty from "../views/ThirdParty/ThirdParty";
import AccountingVouchers from "../views/AccountingVouchers/AccountingVouchers";
import Login from "../views/Login/Login";
import allCompanies from "../views/Company/allCompanies";
import UserCompany from "../views/Company/UserCompany";
import Users from "../views/User/Users";
import Assign from "../views/User/Assign";
import UserAcc from "../components/Users/UserAcc";
import Currencies from "../views/Currency/Currencies";
import Budgets from "../views/Budgets/Budgets";

const dashboardRoutes = [
  {
    id: 0,
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Inicio",
    icon: Dashboard,
    component: DashboardPage,
    invisible: false,
    // allowed: false
  },
  {
    id: 1,
    path: "/empresas/get",
    sidebarName: "Empresas",
    navbarName: "Empresas",
    icon: "business",
    component: allCompanies,
    invisible: false,
    master: false,
    selected: false,
    // allowed: true
  },
  {
    id: 2,
    path: "/empresas/create",
    sidebarName: "Crear Empresas",
    navbarName: "Crear Empresas",
    icon: "subdirectory_arrow_right",
    component: Company,
    invisible: false,
    master: false,
    selected: false,
    // allowed: true,
    method: false
  },
  {
    id: 2,
    path: "/empresas/create",
    sidebarName: "Crear Empresas",
    navbarName: "Crear Empresas",
    icon: "subdirectory_arrow_right",
    component: Company,
    invisible: false,
    master: false,
    selected: false,
    allowed: true
  },
  {
    id: 3,
    path: "/empresas/createC",
    sidebarName: "Empresas",
    navbarName: "Empresas",
    icon: "business",
    component: CreateCompany,
    invisible: true,
    master: true,
    allowed: true,
  },
  {
    id: 4,
    path: "/chartOfAccounts",
    sidebarName: "Plan de Cuentas",
    navbarName: "Plan de Cuentas",
    icon: "library_books",
    component: ChartOfAccounts,
    invisible: false,
    master: false,
    selected: true,
    allowed: false
  },
  {
    id: 5,
    path: "/costCenter",
    sidebarName: "Centros de Costos",
    navbarName: "Centros de Costos",
    icon: "local_atm",
    component: CostCenters,
    invisible: false,
    master: false,
    selected: true,
    allowed: false
  },
  {
    id: 6,
    path: "/assets",
    sidebarName: "Activos",
    navbarName: "Activos",
    icon: "all_inbox",
    component: Assets,
    invisible: false,
    master: false,
    selected: true,
    allowed: false
  },
  {
    id: 7,
    path: "/thridParty",
    sidebarName: "Terceros",
    navbarName: "Terceros",
    icon: "group_work",
    component: ThirdParty,
    invisible: false,
    master: false,
    selected: true,
    allowed: false
  },
  {
    id: 8,
    path: "/accountingVouchers",
    sidebarName: "Comprobantes",
    navbarName: "Comprobantes Contables",
    icon: "receipt",
    component: AccountingVouchers,
    invisible: false,
    master: false,
    selected: true,
    allowed: false
  },
  {
    id: 9,
    path: "/budget",
    sidebarName: "Partidas",
    navbarName: "Partidas Presuspuestarias",
    icon: "assignment",
    component: Budgets,
    invisible: false,
    master: false,
    selected: true,
    allowed: false
  },
  {
    id: 10,
    path: "/currency",
    sidebarName: "Monedas",
    navbarName: "Monedas",
    icon: "bubble_chart",
    component: Currencies,
    invisible: false,
    master: false,
    selected: true,
    allowed: false
  },
  {
    id: 11,
    path: "/users",
    sidebarName: "Usuarios",
    navbarName: "Usuarios",
    icon: "people",
    component: User,
    invisible: false,
    master: false,
    selected: false,
    allowed: true
  },
  {
    id: 12,
    path: "/login",
    sidebarName: "Login",
    navbarName: "Login",
    icon: "people",
    component: Login,
    invisible: true,
    master: false,
  },
  {
    id: 13,
    path: "/Empresa",
    sidebarName: "Empresas",
    navbarName: "Empresas",
    icon: "business",
    component: UserCompany,
    master: true,
    allowed: true
  },
  {
    id: 14,
    path: "/Usuarios",
    sidebarName: "Usuarios",
    navbarName: "Usuarios",
    icon: "person",
    component: Users,
    master: true,
    allowed: true
  },
  {
    id: 15,
    path: "/Asignar",
    sidebarName: "Asignar BD",
    navbarName: "Asignar BD",
    icon: "storage",
    component: Assign,
    master: true,
    allowed: true
  },
  {
    id: 16,
    path: "/nuevoUsuario",
    sidebarName: "Crear Usuarios",
    navbarName: "Crear Usuarios",
    icon: "subdirectory_arrow_right",
    component: UserAcc,
    invisible: false,
    master: false,
    selected: false,
    allowed: true
  },
  {
    id: 17,
    path: "/logout",
    sidebarName: "Logout",
    navbarName: "Logout",
    icon: "people",
    component: DashboardPage,
    // invisible: true,
    // master: false,
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" },
  // { redirect: true, path: "/logout", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;

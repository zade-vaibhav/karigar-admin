import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Merchant from "./pages/dashboard/Merchent";
import Payments from "./pages/dashboard/Payments";
import ArchiTech from "./pages/ArchiTech";
import Users from "./pages/dashboard/Users";
import AddAdmin from "./pages/AddAdmin";
import Coupons from "./pages/dashboard/Coupons";
import ServiceCharges from "./pages/dashboard/ServiceCharges";
import BannerManager from "./components/BannerManager/BannerManager";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "User",
        path: "/User",
        element: <Users />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Karigar",
        path: "/Karigar",
        element: <Tables />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Merchents",
        path: "/Merchents",
        element: <Merchant />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Architech",
        path: "/Architech",
        element: <ArchiTech />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Payments",
        path: "/Payments",
        element: <Payments />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Add Admin",
        path: "/addAdmin",
        element: <AddAdmin />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Coupons",
        path: "/Coupons",
        element: <Coupons />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Banner",
        path: "/Banners",
        element:<BannerManager/>,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Service",
        path: "/Sercvice",
        element: <ServiceCharges />,
      },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
    ],
  },
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;

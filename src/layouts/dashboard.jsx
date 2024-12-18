import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import KarigarDetail from "@/pages/dashboard/karigarDetail";
import KarigarorderDetail from "@/pages/dashboard/KarigarorderDetail";
import MerchentDetail from "@/pages/dashboard/MerchentDetails";
import MerchentOrderDetail from "@/pages/dashboard/MerchentOrderDetail";
import MerchentProductDetail from "@/pages/dashboard/MerchentProductDetailsPage";
import KarigarPaymentorderDetail from "@/pages/dashboard/Payments/KarigarPaymentDetailPage";
import MerchentPaymentOrderDetail from "@/pages/dashboard/Payments/MerchentPaymentOrderDetail";
import ArchitechDetail from "@/pages/ArchitechDetail";
import ArchitechorderDetail from "@/pages/ArchitechOrderDetailPage";
import ArchitechPaymentorderDetail from "@/pages/dashboard/Payments/ArchitechpaymentOrderDetail";
import UserDetails from "../pages/dashboard/UserDetails";
import UserProductOrder from "@/pages/dashboard/UserProductOrder";
import UserKarigarOrder from "@/pages/dashboard/UserKarigarOrder";
import UserArchitectOrder from "@/pages/dashboard/UserArchitecOrder";
import EditProduct from "@/pages/dashboard/editProduct";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
          <Route exact path={"/Karigar/:id"} element={<KarigarDetail />} />
          <Route
            exact
            path={"/Karigar/:id/:orderId"}
            element={<KarigarorderDetail />}
          />
          <Route exact path={"/Merchents/:id"} element={<MerchentDetail />} />
          <Route
            exact
            path={"/Merchents/:id/:orderId"}
            element={<MerchentOrderDetail />}
          />
          <Route
            exact
            path={"/Merchents/product/:id/:productId"}
            element={<MerchentProductDetail />}
          />
          <Route exact path={"/Architech/:id"} element={<ArchitechDetail />} />
          <Route
            exact
            path={"/Architech/:id/:orderId"}
            element={<ArchitechorderDetail />}
          />
          <Route
            exact
            path={"/Payments/Karigar/:id/:orderId"}
            element={<KarigarPaymentorderDetail />}
          />
          <Route
            exact
            path={"/Payments/Merchant/:id/:orderId"}
            element={<MerchentPaymentOrderDetail />}
          />
          <Route
            exact
            path={"/Payments/Architech/:id/:orderId"}
            element={<ArchitechPaymentorderDetail />}
          />
          <Route exact path={"/User/:id"} element={<UserDetails />} />
          <Route
            exact
            path={"/User/Product/:id/:orderId"}
            element={<UserProductOrder />}
          />
          <Route
            exact
            path={"/User/Karigar/:id/:orderId"}
            element={<UserKarigarOrder />}
          />
          <Route
            exact
            path={"/User/Architect/:id/:orderId"}
            element={<UserArchitectOrder />}
          />
          <Route
            exact
            path={"/Merchents/Editproduct/:id/:productId"}
            element={<EditProduct />}
          />
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;

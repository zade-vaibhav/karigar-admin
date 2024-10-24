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
          <Route exact path={"/Karigar/:id/:orderId"} element={<KarigarorderDetail />} />
          <Route exact path={"/Merchents/:id"} element={<MerchentDetail />} />
          <Route exact path={"/Merchents/:id/:orderId"} element={<MerchentOrderDetail />} />
          <Route exact path={"/Merchents/product/:id"} element={<MerchentProductDetail />} />
          <Route exact path={"/Architech/:id"} element={<ArchitechDetail />} />
          <Route exact path={"/Architech/:id/:orderId"} element={<ArchitechorderDetail />} />
          <Route exact path={"/Payments/Karigar/:id/:orderId"} element={<KarigarPaymentorderDetail />} />
          <Route exact path={"/Payments/Merchant/:id/:orderId"} element={<MerchentPaymentOrderDetail />} />
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

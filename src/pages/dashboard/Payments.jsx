import ArchitechPayments from "./Payments/ArchitechPayment";
import KarigarPayments from "./Payments/KarigarPayments";
import MerchentPayments from "./Payments/MerchentPayments";
  
  export function Payments() {
   
    return (
     <>
     <KarigarPayments/>
     <MerchentPayments/>
     <ArchitechPayments/>
     </>
    );
  }
  
  export default Payments;
  
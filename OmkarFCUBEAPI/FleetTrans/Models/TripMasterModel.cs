using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class TripMasterModel
    {
        public string? TripId { get; set; }
        public string? TripBranch { get; set; }
        public string? YearId { get; set; }
        public string? VehicleMasterID { get; set; }
        public string? TripNo { get; set; }
        public string? LastTripCloseDate { get; set; }
        public string? NewTripDate { get; set; }
        public string? OpenThrough { get; set; }
        public string? TripOpenBy { get; set; }
        public string? TripOpenDate { get; set; }
        public string? TripStatus { get; set; }
        public string? DriverMasterID { get; set; }
        public string? ConsignorPayParty { get; set; }
        public string? CompNonCompStatus { get; set; }
        public string? ChallanNo { get; set; }
        public string? LoadingFrom { get; set; }
        public string? Destination { get; set; }
        public string? Destination2 { get; set; }
        public string? Destination3 { get; set; } //DistanceTripKM_1

        public string? DistanceTripKM_1 { get; set; }
        public string? Contents { get; set; }
        public string? LoadEmptyType { get; set; }
        public string? ExpectedReportingDt { get; set; }
        public string? ExpectedReportingDays { get; set; }

        public string? LtsDslToBe_1 { get; set; }
        public string? LtsAdblueToBe_1 { get; set; }
        public string? AdvPayable_1 { get; set; }
        public string? ReportingDt_1 { get; set; }
        public string? AdvanceDays_1 { get; set; }

        public string? DelayedDays_1 { get; set; }
        public string? GraceDays_1 { get; set; }
        public string? DeliveryDate { get; set; }
        public string? DetentionDays { get; set; }
        public string? NextReportingBranch { get; set; }

        public string? DistanceTripKM_2 { get; set; }
        public string? NextExpectedReportingDt { get; set; }
        public string? NextExpectedReportingDays { get; set; }
        public string? LtsDslToBe_2 { get; set; }
        public string? LtsAdblueToBe_2 { get; set; }

        public string? AdvPayable_2 { get; set; }
        public string? ReportingDt_2 { get; set; }
        public string? AdvanceDays_2 { get; set; }
        public string? DelayedDays_2 { get; set; }
        public string? GraceDays_2 { get; set; }

        public string? OpBalDriver { get; set; }
        public string? OpBalDsl { get; set; }
        public string? OpBalAdblue { get; set; }
        public string? PaidDriverAdvance { get; set; }
        public string? FreightCollByDriver { get; set; }

        public string? IssuedDslLtrs { get; set; }
        public string? IssuedAdblueLtrs { get; set; }
        public string? RepairsByDriver { get; set; }
        public string? ChallanByDriver { get; set; }
        public string? ParkingByDriver { get; set; }

        public string? AccidentByDriver { get; set; }
        public string? WeighmentByDriver { get; set; }
        public string? OtherExpByDriver { get; set; }
        public string? TollExpByDriver { get; set; }
        public string? CashDslPlace { get; set; }

        public string? CashDslLtrs { get; set; }
        public string? CashDslAmt { get; set; }
        public string? TotalBhattaDays { get; set; }
        public string? BhattaRate { get; set; }
        public string? AllowedBhatta { get; set; }

        public string? OnTimeIncentiveAmt { get; set; }
        public string? MultiDelIncentiveAmt { get; set; }
        public string? PenaltyChargedToDr { get; set; }
        public string? PoolAcAmt { get; set; }
        public string? TotalDriverAc { get; set; }

        public string? TripBalance { get; set; }
        public string? RecdFromDriver { get; set; }
        public string? NetTripBalance { get; set; }
        public string? ClBalDsl { get; set; }
        public string? ClBalAdBlue { get; set; }

        public string? TiclStatus { get; set; }
        public string? TiclRemarks { get; set; }
        public string? TripCloseBy { get; set; }
        public string? TripCloseDt { get; set; }
        public string? TripCloseUpdateDt { get; set; }

        public string? TripLinkYN { get; set; }
        public string? TripSalDoneYN { get; set; } 
        public string? Findocid { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }
        public string? LoggedInUser { get; set; }
        public string? TripBrName { get; set; }
        public string? VehicleNo { get; set; }
        public string? DrName{ get; set; }
        public string? FrPlace { get; set; }
        public string? TPlace { get; set; }

    }
}

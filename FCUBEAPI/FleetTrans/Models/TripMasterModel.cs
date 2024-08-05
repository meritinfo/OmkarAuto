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
        public string? TripStatus { get; set; }
        public string? DriverMasterID { get; set; }
        public string? DefinedMileage { get; set; }
        public string? ClosingKMR { get; set; }
        public string? OpeningKMR { get; set; }
        public string? DistanceTripKM { get; set; }
        public string? LtsDslToBe { get; set; }
        public string? OpBalDsl { get; set; }
        public string? IssuedDslLtrs { get; set; }
        public string? IssuedDslAmt { get; set; }
        public string? DieselPassedLtrs { get; set; }
        public string? DieselPassedAmt { get; set; }
        public string? DieselVarianceAmt { get; set; }
        public string? ClBalDsl { get; set; }
        public string? OpBalDriver { get; set; }
        public string? PaidDriverAdvance { get; set; }
        public string? FreightCollByDriver { get; set; }
        public string? ExpensesByDriver { get; set; }
        public string? TotalBhattaDays { get; set; }
        public string? BhattaRate { get; set; }
        public string? BhattaAmt { get; set; }
        public string? OnTimeIncentiveAmt { get; set; }
        public string? MultiDelIncentiveAmt { get; set; }
        public string? PenaltyChargedToDr { get; set; }
        public string? PenaltyRemarks { get; set; }
        public string? TotalDriverAc { get; set; }
        public string? TripBalance { get; set; }
        public string? RecdFromDriver { get; set; }
        public string? NetTripBalance { get; set; }
        public string? FastagAmount { get; set; }
        public string? TripTotalFreight { get; set; }
        public string? TripTotalAdvance { get; set; }
        public string? TripCloseBy { get; set; }
        public string? TripCloseDt { get; set; }
        public string? TripCloseUpdateDt { get; set; }
        public string? TripLinkYN { get; set; }
        public string? Findocid { get; set; }

        public TripSheetInnerGridListModel? TripSheetInnerGridList { get; set; }
       // public List<MiscListModel>? MiscList { get; set; }
       // public List<AdblueListmodel>? AdblueList { get; set; }
    }

    public class MiscListModel
    {
        public string? ExpType { get; set; }
        public string? MiscAmount { get; set; }
        public string? Narration { get; set; }
    }

    public class AdblueListmodel
    {
        public string? AdbluefillingStation { get; set; }
        public string? AdbluedieselLiter { get; set; }
        public string? AdbluedieselAmount { get; set; }
    }
}

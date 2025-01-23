using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class TripSheetModel
    {
        public string? TripId { get; set; }
        public string? TripBranch { get; set; }
        public string? YearId { get; set; }
        public string? VehicleMasterID { get; set; }
        public string? TripNo { get; set; }
        public string? DeptDate { get; set; }
        public string? EndDate { get; set; }
        public string? StmtDate { get; set; }
        public string? TripStatus { get; set; }
        public string? DriverMasterID { get; set; }
        public string? DefinedMileage { get; set; }
        public string? EmptyMileage { get; set; }
        public string? EmptyKMs { get; set; }
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
        public string? TotalAdblueExp { get; set; }        
        public string? TripBalance { get; set; }
        public string? RecdFromDriver { get; set; }
        public string? NetTripBalance { get; set; }
        public string? FastagAmount { get; set; }
        public string? TripTotalFreight { get; set; }
        public string? TripTotalExpenses { get; set; }
        public string? ExpensesByComp { get; set; }
        public string? TripCloseBy { get; set; }
        public string? TripCloseDt { get; set; }
        public string? TripCloseUpdateDt { get; set; }
        public string? TripLinkYN { get; set; }
        public string? ReportDateTime { get; set; }
        public string? UnloadDateTime { get; set; }
        public string? DetentionDays { get; set; }
        public string? DetnRate { get; set; }
        public string? DetnAmount { get; set; }
        public string? Findocid { get; set; }
        public string? TripBr { get; set; }
        public string? VehicleNo { get; set; }
        public string? DrName { get; set; }
        public string? NextTrip { get; set; }
        public string? Food_Sal_PerDay { get; set; }
        public string? Food_Sal_FromDt { get; set; }
        public string? Food_Sal_ToDt { get; set; }
        public string? Food_Sal_Days { get; set; }
        public string? Food_Sal_Amt { get; set; }
        public string? RtaChallanDesc { get; set; }
        public string? RtaChallanAmt { get; set; }
        public string? PaidToDriver { get; set; }
        public string? Remarks { get; set; }
        public string? LoggedInUser { get; set; }
        public List<DriverDetails> DriverList { get; set; }
        public List<RouteDetails> RouteList { get; set; }
        public List<DieselDetails> DieselList { get; set; }
        public List<AdblueDetails> AdblueList { get; set; }
        public List<FasttagDetails> FasttagList { get; set; }
        public List<TripDrExpDetails> DrExpList { get; set; }
        public List<TripCmpExpDetails> CmpExpList { get; set; }

    }
}
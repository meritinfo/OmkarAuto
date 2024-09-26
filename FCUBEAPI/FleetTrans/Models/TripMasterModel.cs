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
        public string? DeptDate { get; set; }
        public string? EndDate { get; set; }
        public string? StmtDate { get; set; }
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
        public string? TripTotalExpenses { get; set; }
        public string? TripCloseBy { get; set; }
        public string? TripCloseDt { get; set; }
        public string? TripCloseUpdateDt { get; set; }
        public string? TripLinkYN { get; set; }
        public string? Findocid { get; set; }
        public string? TripBr { get; set; }
        public string? VehicleNo { get; set; }
        public string? DrName { get; set; }
        public string? NextTrip { get; set; }        
        public string? LoggedInUser { get; set; }
        public List<DriverDetails> DriverList { get; set; }
        public List<RouteDetails> RouteList { get; set; }
        public List<DieselDetails> DieselList { get; set; }
        public List<TripDrExpDetails> ExpList { get; set; }
    }

    public class DriverDetails
    {
        public string? PmtId { get; set; }
        public string? PmtBranch { get; set; }
        public string? PmtDate { get; set; }
        public string? TransType { get; set; }
        public string? AmountPaid { get; set; }
        public string? Remarks { get; set; }
        public string? PmtType { get; set; }
    }
    public class RouteDetails
    {
        public string? LoadId { get; set; }
        public string? LoadBranch { get; set; }
        public string? LoadDate { get; set; }
        public string? LoadType { get; set; }
        public string? LoadFor { get; set; }
        public string? LoadMemoNo { get; set; }
        public string? LoadingFrom { get; set; }
        public string? ConsignorName { get; set; }
        public string? LoadingTo { get; set; }
        public string? ConsigneeName { get; set; }
        public string? HireAmt { get; set; }
        public string? Remarks { get; set; }
    }
    public class DieselDetails
    {
        public string? DetailID { get; set; }
        public string? AccountName { get; set; }
        public string? TransDate { get; set; }
        public string? DslQty { get; set; }
        public string? DslRate { get; set; }
        public string? Amount { get; set; }
        public string? Remarks { get; set; }
    }
    public class TripDrExpDetails
    {
        public string? TripDtlId { get; set; }
        public string? TripId { get; set; }
        public string? ExpId { get; set; }
        public string? ExpParticulars { get; set; }
        public string? ExpAmt { get; set; }
     
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class ChallanMasterModel
    {
        public string? ChallanId { get; set; }
        public string? ChallanBranch { get; set; }
        public string? ChallanNo { get; set; }
        public string? ChallanDateTime { get; set; }
        public string? ChStatus { get; set; }
        public string? ChSuppYN { get; set; }
        public string? ChallanFromStn { get; set; }
        public string? ChallanToStn { get; set; }
        public string? DistanceKms{ get; set; }
        public string? ExpArrivalDate { get; set; }
        public string? MainChallanBranch { get; set; }
        public string? MainChallanNo { get; set; }
        public string? BrokerId { get; set; }
        public string? BrokerMblNo { get; set; }
        public string? OwnTruckYN { get; set; }
        public string? TruckNo { get; set; }
        public string? VehicleType { get; set; }
        public string? VehicleMake { get; set; }
        public string? VehicleModel { get; set; }
        public string? EngineNo { get; set; }
        public string? ChassisNo{ get; set; }
        public string? VehicleOwnerName { get; set; }
        public string? VehicleOwnerAdd1 { get; set; }
        public string? VehicleOwnerAdd2 { get; set; }
        public string? VehicleOwnerPanNo { get; set; }
        public string? PanValid { get; set; }
        public string? AadharLinked { get; set; }
        public string? ItFiled{ get; set; }
        public string? VehicleOwnerMblNo { get; set; }
        public string? VehicleInsDetails { get; set; }
        public string? PermitValid { get; set; }
        public string? DriverAddress { get; set; }
        public string? DriverLicNo { get; set; }
        public string? DriverLicIssuedAt { get; set; }
        public string? DriverLicValid { get; set; }
        public string? DriverMblNo { get; set; }
        public string? EngagedBy { get; set; }
        public string? LoadedBy { get; set; }
        public string? UnLoadingBy { get; set; }
        public string? DeclarationYN { get; set; }
        public string? DeclarationRecdBy { get; set; }
        public string? OdcLength { get; set; }
        public string? OdcHeight{ get; set; }
        public string? OdcCFT { get; set; }
        public string? TotPkgs { get; set; }
        public string? TotActWt { get; set; }
        public string? TotChrgWt { get; set; }
        public string? RatePerTon { get; set; }
        public string? LorryHire { get; set; }
        public string? ExtraHire1 { get; set; }
        public string? ExtraHire2 { get; set; }
        public string? ExtraHire3 { get; set; }
        public string? Deduction1 { get; set; }
        public string? Deduction2 { get; set; }
        public string? SubTotal { get; set; }
        public string? TdsPct { get; set; }
        public string? TdsAmt { get; set; }
        public string? TotalHire { get; set; }
        public string? CashAdvance{ get; set; }
        public string? CardAdvance { get; set; }
        public string? TotalAdvance { get; set; }
        public string? Balance { get; set; }
        public string? BalancePayAt { get; set; }
        public string? CashAdvancePaid { get; set; }
        public string? CardAdvancePaid { get; set; }
        public string? AdvanceTds { get; set; }
        public string? AdvanceLhpm { get; set; }
        public string? AdvanceClaims { get; set; }
        public string? AdvanceOthDed { get; set; }
        public string? BalancePaid { get; set; }
        public string? BalanceTds { get; set; }
        public string? BalanceLhpm { get; set; }
        public string? BalanceClaims { get; set; }
        public string? BalanceOthDed { get; set; }
        public string? AmountPaid { get; set; }
        public string? ExtraHandling { get; set; }
        public string? ExtraDetention { get; set; }
        public string? ExtraOthers { get; set; }
        public string? ExtraOthers1 { get; set; }
        public string? ExtraOthers2 { get; set; }
        public string? ExtraOthers3 { get; set; }
        public string? DeliveryRemarks { get; set; }
        public string? GeneralRemarks { get; set; }
        public string? Photo1 { get; set; }
        public string? Photo2 { get; set; }
        public string? Photo3 { get; set; }
        public string? TruckDriverImage { get; set; }
        public string? DeclAttatched { get; set; }
        public string? DelAckYN { get; set; }
        public string? TarYN { get; set; }
        public string? TarArrDate { get; set; }
        public string? TarUlDate { get; set; }
        public string? TarPodDate { get; set; }
        public string? TripAdj { get; set; }
        public string? Ftmid { get; set; }
        public string? YearId { get; set; }
        public string? ModifyRemarks { get; set; }
        public string? LoggedInUser { get; set; }
        public List<ChallanDetailModel> ChallanDtls { get; set; }

    }
}


namespace FleetTrans.Models
{
    public class VehicleInstScheduleModel
    {        
        public string? MasterID          { get; set; }
        public string? VehicleMasterId   { get; set; }
        public string? VehicleNo         { get; set; }
        public string? LoanType          { get; set; }
        public string? LoanTp            { get; set; }
        public string? StartDate         { get; set; }
        public string? EndDate           { get; set; }
        public string? NoOfMonths        { get; set; }
        public string? PrincipalEmi      { get; set; }
        public string? InterestEmi       { get; set; }
        public string? TotalEmi          { get; set; }
        public string? ScheudleType      { get; set; }
        public string? TotalPrincipal    { get; set; }
        public string? TotalInterest     { get; set; }
        public string? TotalLoanAmt      { get; set; }
        public string? Remarks           { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }
        public string? LoggedInUser      { get; set; }
        public List<VehicleInstScheduleDtlModel> InstScheduleDtls { get; set; }

    }
}

namespace FinanceMasters.Models
{
    public class OpeningBalanceMasterModel
    {
        public string? YearID { get; set; }
        public string? BranchCode { get; set; }
        public string? BranchName { get; set; }
        public List<OpeningBalanceDetailModel> openingBalDetailList { get; set; }
    }


    public class OpeningBalanceDetailModel
    {
        public string? AccountID { get; set; }
        public string? OpeningBalanceAmt { get; set; }
        public string? OpeningBalanceCrDr { get; set; }
    }
}

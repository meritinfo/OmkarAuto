namespace FinanceMasters.Models
{
    public class OpeningBalanceMasterModel
    {
        public string? YearID { get; set; }
        public string? BranchCode { get; set; }
        public string? BranchName { get; set; }
        public List<OpeningBalanceDetailModel> openingBalDetailList { get; set; }
    }
}

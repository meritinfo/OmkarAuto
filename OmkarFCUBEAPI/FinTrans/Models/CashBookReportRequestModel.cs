

namespace FinTrans.Models
{
    /// <summary>
    /// Request class model for Cash Book Report
    /// </summary>
    public class CashBookReportRequestModel
    {
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? Branch { get; set; }
    }
}

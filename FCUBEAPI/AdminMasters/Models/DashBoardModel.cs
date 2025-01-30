namespace AdminMasters.Models
{
    /// <summary>
    /// Response class model for User Branch
    /// </summary>
    public class DashBoardModel
    {
        public string? TotalBusi { get; set; }
        public string? PreMonth { get; set; }
        public string? PrvMonth { get; set; }
        public string? OldMonth { get; set; }
        public string? PreMonName { get; set; }
        public string? PrvMonName { get; set; }
        public string? OldMonName { get; set; }
        public string? TotBilledCnt { get; set; }
        public string? TotBilledAmt { get; set; }
        public string? TotUnBilledCnt { get; set; }
        public string? TotUnBilledAmt { get; set; }
        public string? BilledCnt { get; set; }
        public string? BilledAmt { get; set; }
        public string? UnBilledCnt { get; set; }
        public string? UnBilledAmt { get; set; }
        public string? PendingAckCnt { get; set; }
        public string? PendingAckAmt { get; set; }
        public string? VehiCnt { get; set; }
    }
}

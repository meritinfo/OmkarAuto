
namespace FleetMasters.Models
{
    /// <summary>
    /// DocRenewalMaster class model for  DocRenewalMaster 
    /// </summary>
    public class DocRenewalMasterModel
    {
        public string? DocRenewalID { get; set; }
        public string? DocCode { get; set; }
        public string? DocDescription { get; set; }
        public string? DebitType { get; set; }
        public string? ReminderDays { get; set; }
        public string? DebitAc { get; set; }
        public string? IsActive { get; set; }
   
        public string? LoggedInUser { get; set; }
    }
}


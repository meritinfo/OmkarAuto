using System.Collections.Generic;

namespace Shared.Models
{
    /// <summary>
    /// Menu class model for menu list
    /// </summary>
    public class DocRenewalModel
    {
        public string VehicleNo { get; set; }
        public string DocDescription { get; set; }
        public string ValidToDt { get; set; }
        public string NetAmount { get; set; }
        public string DaysRemaining { get; set; }
    }
}

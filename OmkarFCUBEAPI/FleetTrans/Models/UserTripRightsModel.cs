namespace Shared.Models
{
    /// <summary>
    /// Response class model for response
    /// </summary>
    public class UserTripRightsModel
    {
        public bool CanEditTripAfterClose { get; set; }
        public bool CanLinkTrip { get; set; }
        public bool EnableLastNewTripDate { get; set; }
        public bool EnableFromTo { get; set; }
        public bool EnableDriver { get; set; }
        public bool CanCancelBill { get; set; }
        public bool AttachLRtoSameTrip { get; set; }
    }
}

namespace Shared.Models
{
    /// <summary>
    /// Response class model for response
    /// </summary>
    public class UserTripRightsModel
    {
        public bool CanEditTripAfterClose { get; set; }
        public bool CanLinkTrip { get; set; }
    }
}

namespace HRMasters.Models
{
    /// <summary>
    /// HR Master List class model for  HR Master
    /// </summary>
    public class HRMasterModel
    {
        public string? HRId { get; set; }
        public string? HRCode { get; set; }
        public string? Description { get; set; }
        public string? HRType { get; set; }
        public string? LwfYN { get; set; }
        public string? Grade { get; set; }
        public string? LoggedInUser { get; set; }
    }
}

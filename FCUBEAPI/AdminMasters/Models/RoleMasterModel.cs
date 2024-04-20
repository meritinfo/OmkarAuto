namespace AdminMasters.Models
{
    /// <summary>
    ///RoleMaster for User Module
    /// </summary>
    public class RoleMasterModel
    {
        public string? RoleId { get; set; }
        public string? RoleName { get; set; }
        public string? RoleDesc { get; set; }
        public string? ActiveYN { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }
        public string? LoggedInUser { get; set; }
    }
}

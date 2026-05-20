namespace AdminMasters.Models
{
    /// <summary>
    ///RoleMaster for User Module
    /// </summary>
    public class RoleMasterModel
    {
        public string? RoleId { get; set; }
        public string? RoleName { get; set; }
        public string? ActiveYN { get; set; }
        public string? DashboardLink { get; set; }
        public string? RoleDesc { get; set; }
        public string? LoggedInUser { get; set; }
    }
}

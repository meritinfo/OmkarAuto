namespace AdminMasters.Models
{
    /// <summary>
    ///RoleMaster for User Module
    /// </summary>
    public class RolePrivilegesListModel
    {
        public string? RoleId { get; set; }
        public List<RolePrivilegesModel> RolePrivilegesMasterList { get; set; }
        public List<RolePrivilegesModel> RolePrivilegesReportList { get; set; }
    }
}

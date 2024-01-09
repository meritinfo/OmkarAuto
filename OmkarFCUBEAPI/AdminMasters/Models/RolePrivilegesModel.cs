namespace AdminMasters.Models
{
    /// <summary>
    ///RoleMaster for User Module
    /// </summary>
    public class RolePrivilegesModel
    {
        public string? RoleId { get; set; }
        public string? ModuleId { get; set; }
        public string? MenuId { get; set; }
        public string? CreateYN { get; set; }
        public string? EditYN { get; set; }
        public string? ViewYN { get; set; }
        public string? DeleteYN { get; set; }
        public string? PrintYN { get; set; }
        public string? ModuleName { get; set; }
        public string? MenuName { get; set; }
        public string? MenuType { get; set; }
    }
}

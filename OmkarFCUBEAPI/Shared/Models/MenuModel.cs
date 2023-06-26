using System.Collections.Generic;

namespace Shared.Models
{
    /// <summary>
    /// Menu class model for menu list
    /// </summary>
    public class MenuModel
    {
        public int ModuleId { get; set; }
        public string ModuleName { get; set; }
        public string MenuName { get; set; }
        public string MenuType { get; set; }
        public string MenuCode { get; set; }
    }

    public class MenuListModel
    {
        public string ModuleName { get; set; }
        public List<MenuModel> MenuList { get; set; }
    }
}

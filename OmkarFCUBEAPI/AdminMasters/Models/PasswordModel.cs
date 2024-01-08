using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdminMasters.Models
{
    public class PasswordModel
    {
        public string? UserId { get; set; }
        public string? UserName { get; set; }
        public string? UserPassword { get; set; }
        public string? ConfirmPassword { get; set; }
        public string? OldPassword { get; set; }
    }
}

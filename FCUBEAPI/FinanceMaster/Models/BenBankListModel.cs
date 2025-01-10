using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Models
{
    public class BenBankListModel
    {
        public string? BankId { get; set; }
        public string? BankShortCode { get; set; }
        public string? BankName { get; set; }
        public string? ActiveYN { get; set; }
        public string? VerifyAvailYN { get; set; }
        public string? LoggedInUser { get; set; }
      
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class MRRegisterRptModel
    {
        public string? MrStnName { get; set; }
        public string? MrNo { get; set; }
        public string? MrDate { get; set; }
        public string? MrType { get; set; }
        public string? MrReceiptType { get; set; }
        public string? PartyName { get; set; }
        public string? CheqCashAmt { get; set; }
        public string? OnAcAdjAmt { get; set; }
        public string? OnAcNewAmt { get; set; }
        public string? OnAcStatus { get; set; }
        public string? DebitAc { get; set; }
    }
}

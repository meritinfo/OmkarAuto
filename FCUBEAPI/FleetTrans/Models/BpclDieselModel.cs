using System;
using System.Collections.Generic;

namespace FleetTrans.Models
{
    public class BpclDieselModel
    {
        public Pagination pagination { get; set; }
        public List<ReportData> reportData { get; set; }
        public string responseTime { get; set; }
    }

    public class Pagination
    {
        public int currentPage { get; set; }
        public int pageSize { get; set; }
        public string sort { get; set; }
        public int totalPages { get; set; }
        public int totalResults { get; set; }
    }

    public class ReportData
    {
        public string accountEntry { get; set; }
        public string amount { get; set; }
        public string createdDT { get; set; }
        public string product { get; set; }
        public string purchaseAmount { get; set; }
        public string taxDeduction { get; set; }
        public string tcsRate { get; set; }
        public TransactionDetail transactionDetail { get; set; }
        public TransactionSummary transactionSummary { get; set; }

        public string transactionType { get; set; }
        public string unit { get; set; }
        public string volume { get; set; }
        public string walletType { get; set; }

      
    }

    public class TransactionDetail
    {
        public List<ClosingBalance> closingBalance { get; set; }
        public string employeeId { get; set; }
        public string mobileNumber { get; set; }
        public bool paymentIPS { get; set; }
        public string petromilesEarned { get; set; }
        public string rate { get; set; }
        public string roContact { get; set; }
        public string roLocation { get; set; }
        public string transactionId { get; set; }
        public string unit { get; set; }
        public string vehicleNumber { get; set; }
    }

    public class ClosingBalance
    {
        public string closingBalance { get; set; }
        public string walletName { get; set; }
    }

    public class TransactionSummary
    {
        public string cardId { get; set; }
        public string cardName { get; set; }
        public string roCity { get; set; }
        public string roName { get; set; }
    }
}

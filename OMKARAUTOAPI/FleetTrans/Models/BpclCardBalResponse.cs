using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class BpclCardBalResponse
    {
        public CurrentQuery currentQuery { get; set; }
        public List<Facet> Facet { get; set; }
        public List<FleetCards> fleetCards { get; set; }
        public string freeTextSearch { get; set; }
        public Pagination1 pagination { get; set; }
        public List<Sorts> sorts { get; set; }

    }

    public class CurrentQuery
    {
        public string freeTextSearch { get; set; }
        public bool isFreeText { get; set; }
        public string sort { get; set; }
    }

    public class Facet
    {
        public bool category { get; set; }
        public string code { get; set; }
        public bool multiSelect { get; set; }
        public string name { get; set; }
        public int priority { get; set; }
        public List<Values> values { get; set; }
        public bool visible { get; set; }
    }
    public class Values
    {
        public string code { get; set; }
        public int count { get; set; }
        public string name { get; set; }
        public string query { get; set; }
        public bool selected { get; set; }
    }

    public class FleetCards
    {
        public string actualStatus { get; set; }
        public string adhocbalance { get; set; }
        public string adhoclimit { get; set; }
        public string cardType { get; set; }
        public double cardWalletBalance { get; set; }
        public string cardWalletBalanceRange { get; set; }
        public string cardname { get; set; }
        public string customCardName { get; set; }
        public string customerId { get; set; }
        public string dailybalance { get; set; }
        public string dailylimit { get; set; }
        public string deliveryStatus { get; set; }
        public string fleetCardId { get; set; }
        public string[] fuelType { get; set; }
        public bool isRestrictionApplied { get; set; }
        public string limitType { get; set; }
        public string mobileNo { get; set; }
        public string monthlybalance { get; set; }
        public string monthlylimit { get; set; }
        public string selectedNameOfCard { get; set; }
        public int slNo { get; set; }
        public string status { get; set; }
        public string vehicleMake { get; set; }
        public string vehicleNumber { get; set; }
        public string vehicleType { get; set; }
        public string yearOfReg { get; set; }


    }

    public class Pagination1
    {
        public int currentPage { get; set; }
        public int pageSize { get; set; }
        public string sort { get; set; }
        public int totalResults { get; set; }
    }

    public class Sorts
    {
        public string code { get; set; }
        public bool selected { get; set; }


    }
}

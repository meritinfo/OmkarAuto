using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
    public class CustWizardModel
    {
        public string? CustwizId { get; set; }
        public string? CashAc { get; set; }
        public string? FrtIncomeAc { get; set; }
        public string? SgstOutputAc { get; set; }
        public string? CgstOutputAc { get; set; }
        public string? IgstOutputAc { get; set; }
        public string? SgstInputAc { get; set; }
        public string? CgstInputAc { get; set; }
        public string? IgstInputAc { get; set; }
        public string? LH_LorryHireAc { get; set; }
        public string? LH_LorryHirePayableAc { get; set; }
        public string? LH_TdsOnLorryHireAc { get; set; }
        public string? LHP_HamaliAc { get; set; }
        public string? LHP_DetentionAc { get; set; }
        public string? LHP_OtherChargesAc { get; set; }
        public string? LHP_LhpmAc { get; set; }
        public string? LHP_RecoveryAc { get; set; }
        public string? LHP_OthDedAc { get; set; }

        public string? MR_FrtDeductionAc { get; set; }
        public string? MR_ClaimsByPartyAc { get; set; }
        public string? MR_BadDebtsAc { get; set; }
        public string? MR_MiscDedAc { get; set; }
        public string? MR_BankChargesAc { get; set; }
        public string? MR_CashDiscAc { get; set; }
        public string? MR_ExcessRecdAc { get; set; }
        public string? MR_TdsDedAc { get; set; }
        public string? MR_OthDedAc { get; set; }

        public string? Flt_TyreStockAc { get; set; }
        public string? Flt_TyreExpAc { get; set; }
        public string? Flt_TyreSalesAc { get; set; }
        public string? Flt_SparesStockAc { get; set; }
        public string? Flt_LubesStockAc { get; set; }

        public string? Flt_VehMaintExpAc { get; set; }
        public string? Flt_TripDrAdvanceAc { get; set; }
        public string? Flt_TripFrtIncomeAc { get; set; }
        public string? Flt_FltFrtReceivableAc { get; set; }
        public string? Flt_TripExpensesAc { get; set; }
        public string? Flt_DslPetroCardAc { get; set; }
        public string? Flt_HappayCardAc { get; set; }
        public string? Flt_TripDslExpAc { get; set; }
        public string? Flt_TripAdblueExpAc { get; set; }
        public string? Flt_DriverSalaryAc { get; set; }
        public string? Flt_TripSuspenseAc { get; set; }
        public string? Flt_ExtraChargesAc { get; set; }
        public string? Flt_FrtDedAc { get; set; }
        public string? Flt_TdsDedAc { get; set; }
        public string? Flt_OthDedAc { get; set; }
        public string? MR_Others1RecdAc { get; set; }
        public string? MR_Others2RecdAc { get; set; }
        public string? HsdAc { get; set; }
        public string? DslDiscAc { get; set; }
        public string? DslTdsAc { get; set; }
        public string? BrokerAdvAc { get; set; }
        //new added
        public string? MR_OthersDed1Ac { get; set; }
        public string? MR_OthersDed2Ac { get; set; }
        public string? MR_OthersDed3Ac { get; set; }
        public string? MR_RecoverableAc { get; set; }
        public string? BL_StatisticalAc { get; set; }
        public string? BL_FovAc { get; set; }
        public string? BL_DoorCollAc { get; set; }
        public string? BL_HandlingAc { get; set; }
        public string? BL_LoadingDetnAc { get; set; }
        public string? BL_EnrouteAc { get; set; }
        public string? BL_MiscAc { get; set; }
        public string? BL_DoorDelAc { get; set; }
        public string? BL_UnLoadingAc { get; set; }
        public string? BL_DetentionAc { get; set; }
        public string? BL_ExtrasAc { get; set; }
        public string? BL_OthersAc { get; set; }
        public string? RoundOffAc { get; set; }
        public string? UnBilledFrtAc { get; set; }
        public string? Flt_TripFastagAc { get; set; }
        public string? PL_BranchAc { get; set; }
        public string? PL_HoAc { get; set; }


    }
}

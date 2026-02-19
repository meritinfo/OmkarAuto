using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface IRechargeRequestRepository
    {
        Task<List<DropDownListModel>> GetFleetCardList();
        Task<ResponseModel> RechargeRequestSave(RechargeRequestModel rechargeRequest);
        Task<RechargeRequestList> GetRechargeRequestList(ReportRequestModel request);
        Task<ResponseModel> RechargeRequestApproveSave(RechargeRequestList rechargeRequest);
        Task<RechargeRequestList> GetRechargeRequestApproveList(ReportRequestModel request);
        Task<ResponseModel> RechargeRequestDelete(RequestModel requestModel);
        Task<ResponseModel> GetBpclBalanceAmount(ReportRequestModel request);
        Task<ResponseModel> GetVehiBpclCardDetails(RequestModel requestModel);

        Task<ResponseModel> GetBpclCardBalAmount(RequestModel requestModel);

        Task<ResponseModel> FleetCardReturnTransferSave(FleetCardReturnTransferModel request);
        Task<FleetCardReturnTransferList> GetFleetCardReturnTransferList(ReportRequestModel request);
    }
}

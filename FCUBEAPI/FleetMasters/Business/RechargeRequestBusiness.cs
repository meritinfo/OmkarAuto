using DocumentFormat.OpenXml.Office2016.Excel;
using FleetMasters.Models;
using FleetMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Business
{
    public class RechargeRequestBusiness:IRechargeRequestBusiness
    {
        readonly IRechargeRequestRepository rechargeRequestRepository;

        public RechargeRequestBusiness(IRechargeRequestRepository _rechargeRequestRepository)
        {
            rechargeRequestRepository = _rechargeRequestRepository;
        }

        public async Task<List<DropDownListModel>> GetFleetCardList()
        {
            return await rechargeRequestRepository.GetFleetCardList();
        }

        public async  Task<ResponseModel> RechargeRequestSave(RechargeRequestModel obj)
        {
            return await rechargeRequestRepository.RechargeRequestSave(obj);
        }

        public async Task<RechargeRequestList> GetRechargeRequestList(ReportRequestModel request)
        {
            return await rechargeRequestRepository.GetRechargeRequestList(request);

        }

        public async Task<ResponseModel> RechargeRequestApproveSave(RechargeRequestList obj)
        {
            return await rechargeRequestRepository.RechargeRequestApproveSave(obj);

        }
        public async Task<RechargeRequestList> GetRechargeRequestApproveList(ReportRequestModel request)
        {
            return await rechargeRequestRepository.GetRechargeRequestApproveList(request);

        }

        public async Task<ResponseModel> RechargeRequestDelete(RequestModel requestModel)
        {
            return await rechargeRequestRepository.RechargeRequestDelete(requestModel);
        }






    }
}

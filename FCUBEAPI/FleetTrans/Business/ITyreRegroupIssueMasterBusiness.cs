using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface ITyreRegroupIssueMasterBusiness
    {
        Task<ResponseModel> TyreRegroupIssueMasterSave(TyreRegroupIssueMasterModel tyreRegroupIssueMasterModel);
       // Task<ResponseModel> TyreRegroupIssueMasterDetailSave(SqlTransaction transaction, TyreRegroupIssueDtlListmodel tyreRegroupIssueDtlListmodel);
        Task<TyreRegroupIssueMasterInnerGridModel> GetTyreRegroupIssueMasterInnerGridList(RequestModel request);
        Task<TyreRegroupIssueMasterList> GetTyreRegroupIssueMasterList(PageRequest request);
        Task<ResponseModel> TyreRegroupIssueMasterDelete(RequestModel req);
    }
}

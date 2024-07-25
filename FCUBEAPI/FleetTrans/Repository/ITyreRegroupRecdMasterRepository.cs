using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface ITyreRegroupRecdMasterRepository
    {
        Task<ResponseModel> TyreRegroupRecdMasterSave(TyreRegroupRecdMasterModel tyreRegroupRecdMasterModel);
        // Task<ResponseModel> TyreRegroupIssueMasterDetailSave(SqlTransaction transaction, TyreRegroupIssueDtlListmodel tyreRegroupIssueDtlListmodel)
        Task<TyreRegroupRecdMasterInnerGridModel> GetTyreRegroupRecdMasterInnerGridList(RequestModel request);
        Task<ResponseModel> TyreRegroupRecdMasterDelete(RequestModel req);
        Task<TyreRegroupRecdList> GetTyreRegroupRecdMasterList(PageRequest request);
    }
}

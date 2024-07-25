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
        Task<TyreRegroupRecdMasterModel> GetTyreRegroupRecdMasterInnerGridList(RequestModel request);
        Task<ResponseModel> TyreRegroupRecdMasterDelete(RequestModel req);
        Task<TyreRegroupRecdMasterList> GetTyreRegroupRecdMasterList(PageFromDtToDtRequest request);
        Task<TyreRegroupRecdMasterModel> GetTyreRegroupRecdMasterSearchList(RequestModel request);
    }
}

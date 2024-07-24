using FleetTrans.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface ITyreRegroupIssueMasterRepository
    {
        Task<TyreRegroupIssueMasterList> GetTyreRegroupIssueMasterList(PageFromDtToDtRequest request);
        Task<TyreRegroupIssueMasterModel> GetTyreRegroupIssueMasterInnerGridList(RequestModel request);
        Task<ResponseModel> TyreRegroupIssueMasterSave(TyreRegroupIssueMasterModel tyreRegroupIssueMasterModel);
        Task<ResponseModel> TyreRegroupIssueMasterDelete(RequestModel req);
    }
}

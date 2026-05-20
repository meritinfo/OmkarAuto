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
        Task<TyreRegroupIssueMasterList> GetTyreRegroupIssueMasterList(PageFromDtToDtRequest request); 
        Task<TyreRegroupIssueMasterModel> GetTyreRegroupIssueMasterInnerGridList(RequestModel request);
        Task<ResponseModel> TyreRegroupIssueMasterSave(TyreRegroupIssueMasterModel tyreRegroupIssueMasterModel);
        Task<ResponseModel> TyreRegroupIssueMasterDelete(RequestModel req);
    }
}

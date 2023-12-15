using FreightMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;


namespace FreightMasters.Repository
{
    public interface IBranchMasterRepository
    {
        Task<ResponseModel> BranchMasterDetailsSave(BranchMasterModel BranchMasterModel);
        Task<ResponseModel> BranchMasterDetailsDelete(Request requestModel);
        Task<List<DropDownListModel>> GetBranchList();
        Task<BranchMasterList> GetBranchMasterList(PageRequest request);
        Task<ResponseModel> ChkCodeExits(Request req);

    }
}

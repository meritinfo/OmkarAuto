using FreightMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IBranchMasterRepository
    {
        Task<ResponseModel> BranchMasterDetailsSave(BranchMasterModel BranchMasterModel);
        Task<List<BranchListModel>> GetBranchList();
        Task<List<BranchListModel>> GetStateList();
    }
}

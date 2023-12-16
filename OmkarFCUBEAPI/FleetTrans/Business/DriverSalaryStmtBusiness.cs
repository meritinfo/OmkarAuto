using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;

namespace FleetTrans.Business
{
    public class DriverSalaryStmtBusiness : IDriverSalaryStmtBusiness
    {
        readonly IDriverSalaryStmtRepository driverSalaryStmtRepository;
        public DriverSalaryStmtBusiness(IDriverSalaryStmtRepository _driverSalaryStmtRepository)
        {
            driverSalaryStmtRepository = _driverSalaryStmtRepository;
        }
        /// <summary>
        /// Business method for Get Diesel Statement Search List
        /// </summary>
        /// <param name="DieselStatementSearchListRequest"></param>
        public async Task<DriverSalaryStatementList> GetDriverSalaryStatementList(PageRequest request)
        {
            return await driverSalaryStmtRepository.GetDriverSalaryStatementList(request);
        }
        public async Task<ResponseModel> SaveDriverSalaryStatementDetails(DriverSalaryStatementModel request)
        {
            return await driverSalaryStmtRepository.SaveDriverSalaryStatementDetails(request);
        }
    }
}
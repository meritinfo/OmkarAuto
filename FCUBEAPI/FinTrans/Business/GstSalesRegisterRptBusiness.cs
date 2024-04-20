using FinTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;

using System.Threading.Tasks;

using FinTrans.Repository;
using iText.Kernel.Colors;
using iText.Kernel.Events;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Kernel.Pdf.Canvas;
using iText.Kernel.Pdf.Xobject;
using iText.Kernel.Pdf;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;

using DocumentFormat.OpenXml.Drawing.Charts;
using iText.Kernel.Geom;
using iText.Layout;
using Microsoft.Extensions.Options;
using Org.BouncyCastle.Asn1.Ocsp;
using Shared.Repository;
using SqlHelper.Models;
using System.Collections;


namespace FinTrans.Business
{
    public class GstSalesRegisterRptBusiness: IGstSalesRegisterRptBusiness
    {
        readonly IGstSalesRegisterRptRepository gstSalesRegisterRptRepository;
        public GstSalesRegisterRptBusiness(IGstSalesRegisterRptRepository _gstSalesRegisterRptRepository)
        {
            gstSalesRegisterRptRepository = _gstSalesRegisterRptRepository;
        }




        public async Task<GstSalesRegisterRptListModel>GetGstSalesRegisterRptList(ReportRequestModel request)
        {
            return await gstSalesRegisterRptRepository.GetGstSalesRegisterRptList(request);
        }
        public async Task<ResponseModel> GetGstSalesRegisterRptExcel(ReportRequestModel request)
        {
            return await gstSalesRegisterRptRepository.GetGstSalesRegisterRptExcel(request);
        }
    }
}

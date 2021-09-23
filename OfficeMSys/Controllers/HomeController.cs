using OfficeMSys.DB;
using OfficeMSys.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OfficeMSys.Controllers
{
    public class HomeController : Controller
    {
        DBConn conn = new DBConn();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult OfficeSys()
        {

            return View();
        }

        [HttpPost]
        public ActionResult GetDropdown()
        {

            DropdownM DropdownList = conn.DropdownData();
            return Json(new JsonResult { Data = DropdownList });


        }
        [HttpPost]
        public ActionResult SaveAllData(Office data)
        {

            string message;
            conn.SaveData(data, out message);
            return Json(new JsonResult { Data = message });

        }

        [HttpPost]
        public ActionResult GetOfficeData()
        {
            List<FetchInfo> resultList = conn.GetOfficeData();
            return Json(new JsonResult { Data = resultList });

        }

        [HttpGet]
        public JsonResult AllDataList(int pq_rpp, int pq_curpage)
        {
            FinalResult response = new FinalResult();

            try
            {
                PQModel requestData = new PQModel
                {
                    RowPerPage = pq_rpp,
                    CurrentPage = pq_curpage
                };

                PQResult<PqFinalResult> finalData = conn.GetAllData(requestData);

                //  SearchCollectorAreaGraceResult<CollectorAreaGraceMasterData> searchResult = bl.GetList(requestData, 0); // 0 for Unapproved

                response.Data = finalData.Records;
                return Json(new { Success = true, response.Data, CurrentPage = pq_curpage, TotalRecords = finalData.TotalCount }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

            }
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EditData(int? Id)
        {
            Office EditList = conn.EditMyData(Id);
            return Json(new JsonResult { Data = EditList, JsonRequestBehavior = JsonRequestBehavior.DenyGet });

        }

        [HttpPost]
        public ActionResult UpdateAllData(Office data)
        {

            string message;
            conn.UpdateData(data, out message);
            return Json(new JsonResult { Data = message });

        }
    }
}
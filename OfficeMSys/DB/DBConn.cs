using Newtonsoft.Json;
using OfficeMSys.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace OfficeMSys.DB
{
    public class DBConn
    {
        private string connectionString = string.Empty;
        private SqlConnection sqlcon;

        public DBConn()
        {
            connectionString = ConfigurationManager.ConnectionStrings["myConnection"].ToString();
        }

        public void createconnection()
        {
            sqlcon = new SqlConnection(connectionString);
        }

        public DropdownM DropdownData()
        {
            createconnection();
            DropdownM Dropdowndetails = new DropdownM();

            
            List<CountryM> CList = new List<CountryM>();
            
            List<CityM> CityList = new List<CityM>();
            List<ProvinceM> PList = new List<ProvinceM>();
            
            SqlCommand cmd = new SqlCommand("[alldropdown]", sqlcon);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            sqlcon.Open();
            SqlDataReader rdr = cmd.ExecuteReader();

            if (rdr.HasRows)
            {
                while (rdr.Read())
                {
                    CityList.Add(new CityM
                    {
                        CityId = int.Parse(rdr["CityId"].ToString()),
                        CityName = rdr["CityName"].ToString()

                    });
                }
                Dropdowndetails.CityMList = CityList;
                

            }

            if (rdr.NextResult())
            {
                while (rdr.Read())
                {

                    PList.Add(new ProvinceM
                    {
                        ProvinceId = int.Parse(rdr["ProvinceId"].ToString()),
                        ProvinceName = rdr["ProvinceName"].ToString()

                    });
                }
                Dropdowndetails.ProvinceMList = PList;
            }


            if (rdr.NextResult())
            {
                while (rdr.Read())
                {
                    CList.Add(new CountryM
                    {
                        CountryId = int.Parse(rdr["CountryId"].ToString()),
                        CountryName = rdr["CountryName"].ToString()
                    });
                }
                Dropdowndetails.CountryMList = CList;

            }
          
           

            sqlcon.Close();
            return Dropdowndetails;
        }

        public void SaveData(Office data, out string message)
        {
            try
            {
                createconnection();
                SqlCommand cmd = new SqlCommand("[insertAll]", sqlcon);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                string jsondata = JsonConvert.SerializeObject(data.EmployeeList);
                string jsonedudata = JsonConvert.SerializeObject(data.CustomerList);

                cmd.Parameters.AddWithValue("@OfficeName", data.OfficeName);
                cmd.Parameters.AddWithValue("@PANnumber", data.PANnumber);
                cmd.Parameters.AddWithValue("@StreetAddress", data.StreetAddress);
                cmd.Parameters.AddWithValue("@Phone", data.Phone);
                cmd.Parameters.AddWithValue("@PostalCode", data.PostalCode);
                cmd.Parameters.AddWithValue("@CityId", data.CityId);
                cmd.Parameters.AddWithValue("@ProvinceId", data.ProvinceId);
                cmd.Parameters.AddWithValue("@CountryId", data.CountryId);
                cmd.Parameters.AddWithValue("@jsEmployeeData", jsondata);
                cmd.Parameters.AddWithValue("@jsCustomerData", jsonedudata);
                sqlcon.Open();
                cmd.ExecuteNonQuery();
                sqlcon.Close();

                message = "Success";

            }
            catch (Exception ex)
            {
                message = ex.Message;
            }

        }

        public List<FetchInfo> GetOfficeData()
        {

            createconnection();
            List<FetchInfo> resultList = new List<FetchInfo>();
            SqlCommand cmd = new SqlCommand("[selectofficedata]", sqlcon);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            sqlcon.Open();
            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                var FetchInfo = new FetchInfo();
                FetchInfo.ID = int.Parse(rdr["ID"].ToString());
                FetchInfo.OfficeName = rdr["OfficeName"].ToString();
                FetchInfo.PANnumber = rdr["PANnumber"].ToString();
                FetchInfo.StreetAddress = rdr["StreetAddress"].ToString();
                FetchInfo.Phone = rdr["Phone"].ToString();
                FetchInfo.PostalCode = rdr["PostalCode"].ToString();
                FetchInfo.CityId = int.Parse(rdr["CityId"].ToString());
                FetchInfo.CityName = rdr["CityName"].ToString();
                FetchInfo.ProvinceId = int.Parse(rdr["ProvinceId"].ToString());
                FetchInfo.ProvinceName = rdr["ProvinceName"].ToString();
                FetchInfo.CountryId = int.Parse(rdr["CountryId"].ToString());
                FetchInfo.CountryName = rdr["CountryName"].ToString();


                resultList.Add(FetchInfo);
            }

            sqlcon.Close();
            return resultList;
        }
        public Office EditMyData(int? Id)
        {
            createconnection();
            Office editdetail = new Office();
            List<EmployeeM> EmpList = new List<EmployeeM>();
            List<CustomerM> CusList = new List<CustomerM>();
            List<OrderProduct> orderproductList = new List<OrderProduct>();
            SqlCommand cmd = new SqlCommand("[EditAll]", sqlcon);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", Id);
            sqlcon.Open();
            SqlDataReader rdr = cmd.ExecuteReader();

            if (rdr.HasRows)
            {
                while (rdr.Read())
                {
                    editdetail.ID = int.Parse(rdr["ID"].ToString());
                    editdetail.OfficeName = rdr["OfficeName"].ToString();
                    editdetail.PANnumber = rdr["PANnumber"].ToString();
                    editdetail.StreetAddress = rdr["StreetAddress"].ToString();
                    editdetail.Phone = rdr["Phone"].ToString();
                    editdetail.PostalCode = rdr["PostalCode"].ToString();
                    editdetail.CityId = int.Parse(rdr["CityId"].ToString());
                    editdetail.ProvinceId = int.Parse(rdr["ProvinceId"].ToString());                    
                    editdetail.CountryId = int.Parse(rdr["CountryId"].ToString());
                    

                }
            }
            if (rdr.NextResult())
            {
                while (rdr.Read())
                {

                    EmpList.Add(new EmployeeM
                    {
                        
                        FirstName = rdr["FirstName"].ToString(),
                        
                        LastName = rdr["LastName"].ToString(),
                        
                        Phone = rdr["Phone"].ToString(),
                        Email = rdr["Email"].ToString(),
                        JobTitle = rdr["JobTitle"].ToString()
                        
                    });
                }
                editdetail.EmployeeList = EmpList;
            }
            if (rdr.NextResult())
            {
                while (rdr.Read())
                {

                    CusList.Add(new CustomerM
                    {
                       CustomerID = int.Parse(rdr["CustomerID"].ToString()),
                        Name = rdr["Name"].ToString(),
                        Address1 = rdr["Address1"].ToString(),
                        Phone = rdr["Phone"].ToString(),
                        PostalCode = rdr["PostalCode"].ToString(),
                        CityId = int.Parse(rdr["CityId"].ToString()),
                        CityName = rdr["CityName"].ToString(),

                    });
                }
               
            }

            if (rdr.NextResult())
            {
                while (rdr.Read())
                {

                    orderproductList.Add(new OrderProduct
                    {
                            OrderID = int.Parse(rdr["OrderID"].ToString()),
                            OrderProductName = rdr["OrderProductName"].ToString(),
                            OrderDate = rdr["OrderDate"].ToString(),
                            SubmissionDate = rdr["SubmissionDate"].ToString(),
                            CustomerID = int.Parse(rdr["CustomerID"].ToString())

                    });
                }
                
            }
            


            sqlcon.Close();

            for (int i = 0; i < CusList.Count; i++)
            {

                List<OrderProduct> oddlist = new List<OrderProduct>();
                for (int j = 0; j < orderproductList.Count; j++)
                {
                    if (CusList[i].CustomerID == orderproductList[j].CustomerID)
                    {
                       oddlist.Add(orderproductList[j] );

                       
                    }
                    
                }
                CusList[i].OrderList = oddlist;


            }

            editdetail.CustomerList = CusList;
            return editdetail;

        }


        public void UpdateData(Office data, out string message)
        {
            try
            {
                createconnection();
                SqlCommand cmd = new SqlCommand("[UpdateAll]", sqlcon);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                string jsondata = JsonConvert.SerializeObject(data.EmployeeList);
                string jsonedudata = JsonConvert.SerializeObject(data.CustomerList);

                cmd.Parameters.AddWithValue("@ID", data.ID);
                cmd.Parameters.AddWithValue("@OfficeName", data.OfficeName);
                cmd.Parameters.AddWithValue("@PANnumber", data.PANnumber);
                cmd.Parameters.AddWithValue("@StreetAddress", data.StreetAddress);
                cmd.Parameters.AddWithValue("@Phone", data.Phone);
                cmd.Parameters.AddWithValue("@PostalCode", data.PostalCode);
                cmd.Parameters.AddWithValue("@CityId", data.CityId);
                cmd.Parameters.AddWithValue("@ProvinceId", data.ProvinceId);
                cmd.Parameters.AddWithValue("@CountryId", data.CountryId);
                cmd.Parameters.AddWithValue("@jsEmployeeData", jsondata);
                cmd.Parameters.AddWithValue("@jsCustomerData", jsonedudata);
                sqlcon.Open();
                cmd.ExecuteNonQuery();
                sqlcon.Close();

                message = "Success";

            }
            catch (Exception ex)
            {
                message = ex.Message;
            }

        }

        public PQResult<PqFinalResult> GetAllData(PQModel requestData)
        {
            int totalRecords = 0;
            PqFinalResult resultData = new PqFinalResult();
            List<FetchInfo> list = new List<FetchInfo>();

            createconnection();
            SqlCommand cmd = new SqlCommand("[All_RemoteData]", sqlcon);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.Add("@SKIP_COUNT", SqlDbType.Int).Value = (requestData.CurrentPage - 1) * requestData.RowPerPage;
            cmd.Parameters.Add("@ROW_COUNT", SqlDbType.Int).Value = requestData.RowPerPage;
            sqlcon.Open();
            SqlDataReader rdr = cmd.ExecuteReader();
            if (rdr.HasRows)
            {

                while (rdr.Read())
                {
                    var FetchInfo = new FetchInfo();

                    FetchInfo.ID = int.Parse(rdr["ID"].ToString());
                    FetchInfo.OfficeName = rdr["OfficeName"].ToString();
                    FetchInfo.PANnumber = rdr["PANnumber"].ToString();
                    FetchInfo.StreetAddress = rdr["StreetAddress"].ToString();
                    FetchInfo.Phone = rdr["Phone"].ToString();
                    FetchInfo.PostalCode = rdr["PostalCode"].ToString();
                    FetchInfo.CityId = int.Parse(rdr["CityId"].ToString());
                    FetchInfo.CityName = rdr["CityName"].ToString();
                    FetchInfo.ProvinceId = int.Parse(rdr["ProvinceId"].ToString());
                    FetchInfo.ProvinceName = rdr["ProvinceName"].ToString();
                    FetchInfo.CountryId = int.Parse(rdr["CountryId"].ToString());
                    FetchInfo.CountryName = rdr["CountryName"].ToString();

                    list.Add(FetchInfo);
                }
            }
            if (rdr.NextResult() && rdr.HasRows && rdr.Read())
            {
                totalRecords = rdr.GetInt32(0);
            }

            sqlcon.Close();

            resultData.AllData = list;

            return new PQResult<PqFinalResult>
            {
                Records = resultData,
                TotalCount = totalRecords
            };
        }


    }
}
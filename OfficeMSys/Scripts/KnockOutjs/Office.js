

const pqOptions = {
    width: "auto",
    height: 250,
    showTitle: false,
    showHeader: true,
    showTop: false,
    showToolbar: true,
    showBottom: true,
    wrap: true,
    hwrap: false,
    sortable: false,
    editable: false,
    resizable: true,
    collapsible: false,
    draggable: true, dragColumns: { enabled: true },
    scrollModel: { autoFit: true },
    numberCell: { show: true, resizable: true, title: "S.N.", minWidth: 30 },
    pageModel: { curPage: 1, rPP: 10, type: "local" },
    columnTemplate: { wrap: true, editable: false, dataType: "string", halign: "center",  hvalign: "center", resizable: true, styleHead: { 'font-weight': "bold" } },
};

function OfficeVM() {
    const self = this;

    var isNullOrEmpty = function (str) {
        if (str === undefined || str === null) {
            return true;
        } else if (typeof str === "string") {
            return (str.trim() === "");
        } else {
            return false;
        }
    };


    var isNumeric = function (str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail

    }

    const models = {
        OfficeModel: function (item) {
            item = item || {};
            this.OfficeName = ko.observable(item.OfficeName || "");
            this.PANnumber = ko.observable(item.PANnumber || "");
            this.StreetAddress = ko.observable(item.StreetAddress || "");
            this.CityId = ko.observable(item.CityId || "");
            this.CityName = ko.observable(item.CityName || "");
            this.Phone = ko.observable(item.Phone || "");
            this.ProvinceId = ko.observable(item.ProvinceId || "");
            this.ProvinceName = ko.observable(item.ProvinceName || "");
            this.PostalCode = ko.observable(item.PostalCode || "");
            this.CountryId = ko.observable(item.CountryId || "");
            this.CountryName = ko.observable(item.CountryName || "");
            


        },

        EmployeeModel: function (item) {
            item = item || {};
            this.FirstName = ko.observable(item.FirstName || "");
            this.LastName = ko.observable(item.LastName || "");
            this.Phone = ko.observable(item.Phone || "");
            this.Email = ko.observable(item.Email || "");
            this.JobTitle = ko.observable(item.JobTitle || "");
        },

        CustomerModel: function (item) {
            item = item || {};
            this.Name = ko.observable(item.Name || "");
            this.Address1 = ko.observable(item.Address1 || "");
            this.Phone = ko.observable(item.Phone || "");
            this.CityId = ko.observable(item.CityId || "");
            this.CityName = ko.observable(item.CityName || "");
            this.PostalCode = ko.observable(item.PostalCode || "");
            this.OrderList = ko.observableArray([]);
           
           
        },

        OrderModel: function (item) {
            item = item || {};
            this.OrderProductName = ko.observable(item.OrderProductName || "");
            this.OrderDate = ko.observable(item.OrderDate || "");
            this.SubmissionDate = ko.observable(item.SubmissionDate || "");
        },

        UiElements: function () {
            self.OfficeModel = ko.observable(new models.OfficeModel());
            self.EmployeeModel = ko.observable(new models.EmployeeModel());
            self.CustomerModel = ko.observable(new models.CustomerModel());
            self.OrderModel = ko.observable(new models.OrderModel());
            self.SearchField = ko.observable();
           
            self.ID = ko.observable('');

            self.DataList = ko.observableArray([]);
            self.EmployeeDataList = ko.observableArray([]);
            self.CustomerDataList = ko.observableArray([]);
            self.OrderDataList = ko.observableArray([]);
            self.RemoteList = ko.observableArray([]);
            self.AllDataList = ko.observableArray([]);

            self.enableDisableGender = ko.observable(false);
            self.btnsavenew = ko.observable(true);
            self.btnsavesubmit = ko.observable(false);
            self.btnajaxUpdate = ko.observable(false);
            self.btnclearsubmit = ko.observable(false);
            self.btnemployeesubmit = ko.observable(false);
            self.btnemployeeupdate = ko.observable(false);
            self.btncustomersubmit = ko.observable(false);
            self.btncustomerupdate = ko.observable(false);
            self.btnordersubmit = ko.observable(false);
            self.btnorderupdate = ko.observable(false);
            self.enabledisable = ko.observable(false);

            self.AllDropdownList = ko.observableArray([]);
            self.CityList = ko.observableArray([]);
            self.ProvinceList = ko.observableArray([]);
            self.CountryList = ko.observableArray([]);

        },
    };

    self.SaveAllInfo = function () {

        UiEvents.validate.OfficeinfoValidation();
    };

    self.SaveEmployee = function () {
        if (UiEvents.validate.EmployeeValidation()) {
            UiEvents.functions.SaveEmployeeGrid("EmployeeGrid");

        }
    };
    self.employeedelete = function deleteRow(index) {
        if (confirm("Are you sure want to delete")) {
            self.EmployeeDataList.splice(index, 1);
            UiEvents.functions.SaveEmployeeGrid("EmployeeGrid");
            alert("Deleted Successfully !.");
        }

    };
    self.employeeedit = function editRow(index) {
        if (isNullOrEmpty((self.EmployeeModel().FirstName()) && (self.EmployeeModel().LastName()) && (self.EmployeeModel().Phone()) && (self.EmployeeModel().Email()) && (self.EmployeeModel().JobTitle()))) {

            var a = $('#EmployeeGrid').pqGrid("getRowData", { rowIndx: index });

            self.EmployeeModel().FirstName(a.FirstName);
            self.EmployeeModel().LastName(a.LastName);
            self.EmployeeModel().Phone(a.Phone);
            self.EmployeeModel().Email(a.Email);
            self.EmployeeModel().JobTitle(a.JobTitle);
            

            self.EmployeeDataList.splice(index, 1);
            UiEvents.functions.SaveEmployeeGrid("EmployeeGrid");
            self.btnsavesubmit(false);         
            self.btnclearsubmit(false);
            self.btnemployeesubmit(false);
            self.btnemployeeupdate(true);
            
        }
        else {
            alert("error");
        }

    };
    self.EmployeeUpdate = function updateRow() {

        UiEvents.validate.EmployeeValidation()



    }; 
   
    self.SaveOrder = function () {
        if (UiEvents.validate.OrderValidation()) {
            UiEvents.functions.SaveOrderGrid("OrderGrid");

        }
    };
    self.orderdelete = function deleteRow(index) {
        if (confirm("Are you sure want to delete")) {
            self.OrderDataList.splice(index, 1);
            UiEvents.functions.SaveOrderGrid("OrderGrid");
            alert("Deleted Successfully !.");
        }

    };
    self.orderedit = function editRow(index) {
        if (isNullOrEmpty((self.OrderModel().OrderProductName()) && (self.OrderModel().OrderDate()) && (self.OrderModel().SubmissionDate()))) {

            var b = $('#OrderGrid').pqGrid("getRowData", { rowIndx: index });

            self.OrderModel().OrderProductName(b.OrderProductName);
            self.OrderModel().OrderDate(b.OrderDate);
            self.OrderModel().SubmissionDate(b.SubmissionDate);

            self.OrderDataList.splice(index, 1);
            UiEvents.functions.SaveOrderGrid("OrderGrid");
            self.btnsavesubmit(false);
            self.btnclearsubmit(false);
            self.btnordersubmit(false);
            self.btnorderupdate(true);

        }
        else {
            alert("error");
        }

    };
    self.OrderUpdate = function updateRow() {

        UiEvents.validate.OrderValidation()
    };  

    self.SaveCustomer = function () {

        UiEvents.validate.CustomerValidation();
    };

    self.customerdelete = function deleteRow(index) {
        if (confirm("Are you sure want to delete")) {
            self.CustomerDataList.splice(index, 1);
            self.OrderDataList([]);
            UiEvents.functions.SaveCustomerGrid("CustomerGrid");
            alert("Deleted Successfully !.");
        }
        

    };

    self.customeredit = function editRow(index) {
        if (isNullOrEmpty((self.CustomerModel().Name()) && (self.CustomerModel().Address1()) && (self.CustomerModel().Phone()))) {

            var b = $('#CustomerGrid').pqGrid("getRowData", { rowIndx: index });

            self.CustomerModel().Name(b.Name);
            self.CustomerModel().Address1(b.Address1);
            self.CustomerModel().Phone(b.Phone);
            self.CustomerModel().Name(b.Name);
            self.CustomerModel().CityId(b.CityId);
            self.CustomerModel().CityName(b.CityName);
            self.CustomerModel().PostalCode(b.PostalCode);
            
            
            self.OrderDataList(b.OrderList);
            UiEvents.functions.SaveOrderGrid("OrderGrid");
            self.CustomerDataList.splice(index, 1);
            UiEvents.functions.SaveCustomerGrid("CustomerGrid");
            self.btnsavesubmit(false);
            self.btnclearsubmit(false);
            self.btncustomersubmit(false);
            self.btncustomerupdate(true);

        }
        else {
            alert("error");
        }

    };

    self.CustomerinfoUpdate = function () {

        UiEvents.validate.CustomerValidation();
    };

    self.infoEdit = function (ID) {
        self.btnsavenew(false);
        self.enabledisable(true);
        self.btnsavesubmit(false);
        self.btnajaxUpdate(true);
        self.btnclearsubmit(false);
        self.btnemployeesubmit(true);
        
        self.btncustomersubmit(true);
        self.btnordersubmit(true);
        UiEvents.functions.AjaxEdit(ID);
    };

    self.infoDelete = function (ID) {
        if (confirm("Are you sure want to delete")) {
            UiEvents.functions.Delete(ID);
        }
    };

    self.ajaxUpdate = function (ID) {

        self.btnajaxUpdate(false);
        self.btnsavenew(true);
        self.enabledisable(false);
        self.btnemployeesubmit(false);
        
        self.btncustomersubmit(false);
        
        UiEvents.validate.ajaxUpdateValidation(ID)
    };
  

    const UiEvents = {
        validate: {
            OfficeinfoValidation: function () {
               

                if (isNullOrEmpty(self.OfficeModel().OfficeName())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#officename").focus();
                    alert("Warning! - OfficeName cannot be empty...!!!");
                    
                    
                }

                else if (isNullOrEmpty(self.OfficeModel().PANnumber())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#pannumber").focus();
                    alert("Warning! - OFFICE PAN Number is needed...!!!");


                }


                else if (isNullOrEmpty(self.OfficeModel().StreetAddress())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#streetaddress").focus();
                    alert("Warning! - StreetAddress cannot be empty...!!!");


                }
                else if (isNullOrEmpty(self.OfficeModel().CityId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#city").focus();
                    alert("Warning! - City cannot be empty...!!!");


                }
                else if (isNullOrEmpty(self.OfficeModel().Phone())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#phone").focus();
                    alert("Warning! - PhoneNumber cannot be empty...!!!");
                }
                else if (!(isNumeric(self.OfficeModel().Phone()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#phone").focus();
                    alert("Warning! - Enter Numeric Value...!!!");
                    
                }
                else if (isNullOrEmpty(self.OfficeModel().ProvinceId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#province").focus();
                    alert("Warning! - Province cannot be empty...!!!");


                }

                
                else if (isNullOrEmpty(self.OfficeModel().PostalCode())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#postalcode").focus();
                    alert("Warning! - PostalCode cannot be empty...!!!");


                }
    
                else if (isNullOrEmpty(self.OfficeModel().CountryId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#Country").focus();
                    alert("Warning! - Select your Country...!!!");
                   
                }

                else if (obj.EmployeeDataList() == "") {
                    $("#subtabs").tabs({ active: 0 });
                    $("#firstname").focus();
                    alert("Employee Info cannot be empty..!");

                }

                else if (obj.CustomerDataList() == "") {
                    $("#subtabs").tabs({ active: 1 });
                    $("#name").focus();
                    alert("Warning! - Customer Info cannot be empty...!!!");

                }
                else {
                    self.OfficeModel().CityName((self.CityList().find(X => X.CityId == self.OfficeModel().CityId()) || {}).CityName);
                    self.OfficeModel().ProvinceName((self.ProvinceList().find(X => X.ProvinceId == self.OfficeModel().ProvinceId()) || {}).ProvinceName);
                    self.OfficeModel().CountryName((self.CountryList().find(X => X.CountryId == self.OfficeModel().CountryId()) || {}).CountryName);

                    let jsondata = {
                        OfficeName: self.OfficeModel().OfficeName(),
                        PANnumber: self.OfficeModel().PANnumber(),
                        StreetAddress: self.OfficeModel().StreetAddress(),
                        Phone: self.OfficeModel().Phone(),
                        PostalCode: self.OfficeModel().PostalCode(),
                        CityId: self.OfficeModel().CityId(),
                        ProvinceId: self.OfficeModel().ProvinceId(),
                        CountryId: self.OfficeModel().CountryId(),
                        EmployeeList: self.EmployeeDataList(),
                        CustomerList: self.CustomerDataList()

                    }
                    console.log(jsondata);

                    $.ajax({
                        type: "POST",
                        url: "/Home/SaveAllData",
                        data: JSON.stringify({ "data": jsondata }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("Congratulations! Data Inserted successfully.");
                        }
                    });

                    self.EmployeeDataList([]);
                    self.CustomerDataList([]);                    
                    UiEvents.clear.clearfield1();


                }
            },

            ajaxUpdateValidation: function () {


                if (isNullOrEmpty(self.OfficeModel().OfficeName())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#officename").focus();
                    alert("Warning! - OfficeName cannot be empty...!!!");


                }

                else if (isNullOrEmpty(self.OfficeModel().PANnumber())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#pannumber").focus();
                    alert("Warning! - OFFICE PAN Number is needed...!!!");


                }


                else if (isNullOrEmpty(self.OfficeModel().StreetAddress())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#streetaddress").focus();
                    alert("Warning! - StreetAddress cannot be empty...!!!");


                }
                else if (isNullOrEmpty(self.OfficeModel().CityId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#city").focus();
                    alert("Warning! - City cannot be empty...!!!");


                }
                else if (isNullOrEmpty(self.OfficeModel().Phone())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#phone").focus();
                    alert("Warning! - PhoneNumber cannot be empty...!!!");
                }
                else if (!(isNumeric(self.OfficeModel().Phone()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#phone").focus();
                    alert("Warning! - Enter Numeric Value...!!!");

                }
                else if (isNullOrEmpty(self.OfficeModel().ProvinceId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#province").focus();
                    alert("Warning! - Province cannot be empty...!!!");


                }


                else if (isNullOrEmpty(self.OfficeModel().PostalCode())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#postalcode").focus();
                    alert("Warning! - PostalCode cannot be empty...!!!");


                }

                else if (isNullOrEmpty(self.OfficeModel().CountryId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#Country").focus();
                    alert("Warning! - Select your Country...!!!");

                }

                else if (obj.EmployeeDataList() == "") {
                    $("#subtabs").tabs({ active: 0 });
                    $("#firstname").focus();
                    alert("Employee Info cannot be empty..!");

                }

                else if (obj.CustomerDataList() == "") {
                    $("#subtabs").tabs({ active: 1 });
                    $("#name").focus();
                    alert("Warning! - Customer Info cannot be empty...!!!");

                }
                else {
                    self.OfficeModel().CityName((self.CityList().find(X => X.CityId == self.OfficeModel().CityId()) || {}).CityName);
                    self.OfficeModel().ProvinceName((self.ProvinceList().find(X => X.ProvinceId == self.OfficeModel().ProvinceId()) || {}).ProvinceName);
                    self.OfficeModel().CountryName((self.CountryList().find(X => X.CountryId == self.OfficeModel().CountryId()) || {}).CountryName);

                    let updatejsondata = {
                        ID: self.ID(),
                        OfficeName: self.OfficeModel().OfficeName(),
                        PANnumber: self.OfficeModel().PANnumber(),
                        StreetAddress: self.OfficeModel().StreetAddress(),
                        Phone: self.OfficeModel().Phone(),
                        PostalCode: self.OfficeModel().PostalCode(),
                        CityId: self.OfficeModel().CityId(),
                        ProvinceId: self.OfficeModel().ProvinceId(),
                        CountryId: self.OfficeModel().CountryId(),
                        EmployeeList: ko.toJS(obj.EmployeeDataList()),
                        CustomerList: ko.toJS(obj.CustomerDataList())

                    }
                    
                    
                    $.ajax({
                        type: "POST",
                        url: "/Home/UpdateAllData",
                        data: JSON.stringify({ "data": updatejsondata }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("Congratulations! Data Inserted successfully.");
                        }
                    });

                    self.EmployeeDataList([]);
                    self.CustomerDataList([]);
                    UiEvents.clear.clearfield1();

                    $("#tabs").tabs({ active: 1 });
                    UiEvents.functions.GetAllData("RemoteInfoGrid");

                }
            },
            
            EmployeeValidation: function () {
                if (isNullOrEmpty(self.EmployeeModel().FirstName())) {
                    $("#subtabs").tabs({ active: 0 });
                    $("#firstname").focus();
                    alert("Warning! - EmpoyeeName cannot be empty...!!!");

                }
                else if (isNullOrEmpty(self.EmployeeModel().LastName())) {
                    $("#subtabs").tabs({ active: 0 });
                    $("#lastname").focus();
                    alert("Warning! - LastName  cannot be empty...!!!");

                }
                else if (isNullOrEmpty(self.EmployeeModel().Phone())) {
                    $("#subtabs").tabs({ active: 0 });
                    $("#phone").focus();
                    alert("Warning! - PhoneNumber  cannot be empty...!!!");

                }

                else if (!(isNumeric(self.EmployeeModel().Phone()))) {
                    $("#subtabs").tabs({ active: 0 });
                    $("#phone").focus();
                    alert("Warning! - Enter Numeric Value...!!!");

                }

                else if (isNullOrEmpty(self.EmployeeModel().Email())) {
                    $("#subtabs").tabs({ active: 0 });
                    $("#email").focus();
                    alert("Warning! - Email cannot be empty...!!!");
                    
                }
                else if ((!(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i).test(self.EmployeeModel().Email()))) {
                    $("#subtabs").tabs({ active: 0 });
                    $("#email").focus();
                    alert("Warning! - Invalid Email...!!!");
                    
                }
                else if (isNullOrEmpty(self.EmployeeModel().JobTitle())) {
                    $("#subtabs").tabs({ active: 0 });
                    $("#jobtitle").focus();
                    alert("Warning! - JobTitle cannot be empty...!!!");

                }
                

                else {
                    if ((ko.toJS(obj.EmployeeDataList)).find(x => (x.FirstName == self.EmployeeModel().FirstName()) || (x.LastName == self.EmployeeModel().LastName()) || (x.Phone == self.EmployeeModel().Phone()) || (x.Email == self.EmployeeModel().Email()) || (x.JobTitle == self.EmployeeModel().JobTitle()))) {
                        /*debugger*/
                        alert("Warning! Employee Already Exists!!....");
                        UiEvents.clear.clearfield2();
                    }
                    else {

                       self.EmployeeDataList.push(ko.toJS(self.EmployeeModel()));

                        UiEvents.clear.clearfield2();
                        UiEvents.functions.SaveEmployeeGrid("EmployeeGrid");

                        self.btnemployeesubmit(true);
                        self.btnemployeeupdate(false);
                        self.btnclearsubmit(true);

                    }



                }

            },

            CustomerValidation: function () {


                if (isNullOrEmpty(self.CustomerModel().Name())) {
                    $("#subtabs").tabs({ active: 1 });
                    $("#name").focus();
                    alert("Warning! - CustomerName cannot be empty...!!!");


                }


                else if (isNullOrEmpty(self.CustomerModel().Address1())) {
                    $("#subtabs").tabs({ active: 1 });
                    $("#address1").focus();
                    alert("Warning! - Address cannot be empty...!!!");


                }
                
                else if (isNullOrEmpty(self.CustomerModel().Phone())) {
                    $("#subtabs").tabs({ active: 1 });
                    $("#phone").focus();
                    alert("Warning! - PhoneNumber cannot be empty...!!!");
                }
                else if (!(isNumeric(self.CustomerModel().Phone()))) {
                    $("#subtabs").tabs({ active: 1 });
                    $("#phone").focus();
                    alert("Warning! - Enter Numeric Value...!!!");

                }
                else if (isNullOrEmpty(self.CustomerModel().CityId())) {
                    $("#subtabs").tabs({ active: 1 });
                    $("#city").focus();
                    alert("Warning! - City cannot be empty...!!!");


                }
                else if (isNullOrEmpty(self.CustomerModel().PostalCode())) {
                    $("#subtabs").tabs({ active: 1 });
                    $("#postalcode").focus();
                    alert("Warning! - PostalCOde cannot be empty...!!!");


                }

                

                else if (obj.OrderDataList() == "") {
                    $("#subtabs").tabs({ active: 1 });
                    $("#orderproduct").focus();
                    alert("Warning! - Order Info cannot be empty...!!!");

                }
                else {
                    self.CustomerModel().CityName((self.CityList().find(X => X.CityId == self.CustomerModel().CityId()) || {}).CityName);
                    (self.CustomerModel().OrderList(self.OrderDataList()));
                    self.CustomerDataList.push(ko.toJS(self.CustomerModel()));

                    UiEvents.clear.clearfield3();
                    self.OrderDataList([]);
                    UiEvents.functions.SaveCustomerGrid("CustomerGrid");


                    self.btncustomersubmit(true);
                    self.btncustomerupdate(false);
                    self.btnclearsubmit(true);
                    
                   


                }
            },

            OrderValidation: function () {
                if (isNullOrEmpty(self.OrderModel().OrderProductName())) {
                    $("#subtabs").tabs({ active: 1 });
                    $("#orderproduct").focus();
                    alert("Warning! - OrderProductName cannot be empty...!!!");

                }

                else if (isNullOrEmpty(self.OrderModel().OrderDate())) {
                    $("#subtabs").tabs({ active: 1 });
                    $("#orderdate").focus();
                    alert("Warning! - orderdate cannot be empty...!!!");

                }
                else if (isNullOrEmpty(self.OrderModel().SubmissionDate())) {
                    $("#subtabs").tabs({ active: 1 });
                    $("#submissiondate").focus();
                    alert("Warning! - submissiondate cannot be empty...!!!");

                }
                


                else {
                    if ((ko.toJS(obj.OrderDataList)).find(x => (x.OrderProductName == self.OrderModel().OrderProductName()) || (x.OrderDate == self.OrderModel().OrderDate()) || (x.SubmissionDate == self.OrderModel().SubmissionDate()))) {
                        /*debugger*/
                        alert("Warning! Same Order Already Exists!!....");
                        UiEvents.clear.clearfield4();
                    }
                    else {

                        self.OrderDataList.push(ko.toJS(self.OrderModel()));

                        UiEvents.clear.clearfield4();
                        UiEvents.functions.SaveOrderGrid("OrderGrid");

                        self.btnordersubmit(true);
                        self.btnorderupdate(false);
                        self.btnclearsubmit(true);

                    }



                }

            },

        },
       clear: {
                ResetAll: function () {
               self.OfficeModel(new models.OfficeModel());
               self.EmployeeModel(new models.EmployeeModel());
               self.CustomerModel(new models.CustomerModel());
               self.OrderModel(new models.OrderModel());
               self.EmployeeDataList([]);
               self.CustomerDataList([]);
               self.OrderDataList([]);
                    
                },
                clearfield1: function () {
                    self.OfficeModel(new models.OfficeModel());
                    $("#tabs").tabs();
                },
                clearfield2: function () {
                    self.EmployeeModel(new models.EmployeeModel());
                    $("#subtabs").tabs();
                },
                clearfield3: function () {
                    self.CustomerModel(new models.CustomerModel());
                    $("#subtabs").tabs();
                 },
                clearfield4: function () {
               self.OrderModel(new models.OrderModel());
               $("#subtabs").tabs();
                },
            },
        functions: {

            Alldropdown: function () {

                $.ajax({
                    type: "POST",
                    url: "/Home/GetDropdown",
                    /*data: JSON.stringify({ "data": jsondata }),*/
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        
                        self.CityList(result.Data.CityMList);
                        self.ProvinceList(result.Data.ProvinceMList);
                        self.CountryList(result.Data.CountryMList);

                    }
                });
            },

            GetOfficeinfo: function () {

                $.ajax({
                    type: "POST",
                    url: "/Home/GetOfficeData",
                    /*data: JSON.stringify({ "data": jsondata }),*/
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        
                        self.AllDataList([]);
                        self.AllDataList(result.Data);
                        UiEvents.functions.SaveAllinfogrid("AllInfoGrid");

                    }
                });
            },
           
            GetAllData: function (control) {

                var tempData = {
                    location: "remote",
                    method: "GET",
                    dataType: "JSON",
                    url: '/Home/AllDataList',
                    contentType: "application/json; charset=UTF-8",
                    recIndx: "ID",
                    beforeSend: function (jqXHR, settings) {
                        return true;
                    },
                    //error: function (jqXHR, textStatus, errorThrown) {
                    //    console.error(errorThrown);
                    //},
                    getData: function (result) {
                        
                        if (result && result.Success) {
                            const data = result.Data;
                            return { curPage: result.CurrentPage, totalRecords: result.TotalRecords, data: data.AllData };
                        }
                        else {
                            Empower.message("Warning", result.Message || "Warning ! - Error Occured...!!!");
                            return { curPage: 0, totalRecords: 0, data: [] };
                        }
                    }
                };

                var options = Object.assign({}, pqOptions);
                options.pageModel = { curPage: 1, rPP: 10, type: "remote" };
                options.height = 400;
                options.colModel = [
                    { title: "OfficeName", align: "center", dataIndx: "OfficeName", width: "10%" },
                    { title: "PANnumber", align: "center", dataIndx: "PANnumber", width: "10%" },
                    { title: "StreetAddress", align: "center", dataIndx: "StreetAddress", width: "10%" },
                    { title: "City", align: "Center", dataIndx: "CityName", width: "10%" },
                    { title: "Phone", align: "Center", dataIndx: "Phone", width: "12%" },
                    { title: "Province", align: "Center", dataIndx: "ProvinceName", width: "10%" },
                    { title: "PostalCode", align: "Center", dataIndx: "PostalCode", width: "8%" },
                    { title: "Country", align: "Center", dataIndx: "CountryName", width: "10%" },
                    {
                        title: "Action", align: "center", width: "20%", render: function (ui) {

                            return `<button class="btn btn-danger" onclick="obj.infoDelete(${ui.rowData.ID});" type="button">delete</button> <button class="btn btn-info" onclick="obj.infoEdit(${ui.rowData.ID});" type="button">Edit</button>`;
                        }
                    }

                ];
                options.dataModel = tempData;
                if ($("#" + control).pqGrid("instance")) {
                    $("#" + control).pqGrid('refreshDataAndView');
                } else {
                    $("#" + control).pqGrid(options);
                }

            },

            Delete: function (ID) {
                $.ajax({
                    type: "POST",
                    url: '/Home/DeleteData',
                    data: JSON.stringify({ "id": ID }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",

                    success: function (result) {
                        UiEvents.functions.GetOfficeinfo();
                        UiEvents.functions.SaveAllinfogrid("AllInfoGrid");
                        alert("info deleted");
                    }
                });
            },

            Search: function (officename) {
                $.ajax({
                    type: "POST",
                    url: "/Home/GetSearchData",
                    data: JSON.stringify({ "OfficeName": officename }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (searchresult) {
                        
                        self.AllDataList([]);
                        self.AllDataList(searchresult.Data);
                        UiEvents.functions.SaveAllinfogrid("AllInfoGrid");

                    }
                });
            },

            AjaxEdit: function (ID) {
                $.ajax({
                    type: "POST",
                    url: "/Home/EditData",
                    data: JSON.stringify({ "Id": ID }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (editdata) {
                        
                        $("#tabs").tabs({ active: 0 });
                        self.OfficeModel().OfficeName(editdata.Data.OfficeName);
                        self.OfficeModel().PANnumber(editdata.Data.PANnumber);
                        self.OfficeModel().StreetAddress(editdata.Data.StreetAddress);
                        self.OfficeModel().CityId(editdata.Data.CityId);
                        self.OfficeModel().Phone(editdata.Data.Phone);
                        self.OfficeModel().ProvinceId(editdata.Data.ProvinceId);
                        self.OfficeModel().PostalCode(editdata.Data.PostalCode);
                        self.OfficeModel().CountryId(editdata.Data.CountryId);
                        self.ID(editdata.Data.ID);
                       
                        

                        self.EmployeeDataList([]);
                        self.EmployeeDataList(editdata.Data.EmployeeList);
                        UiEvents.functions.SaveEmployeeGrid("EmployeeGrid");

                        self.CustomerDataList([]);
                        self.CustomerDataList(editdata.Data.CustomerList);
                        UiEvents.functions.SaveCustomerGrid("CustomerGrid");
                        UiEvents.functions.SaveOrderGrid("OrderGrid");
                        

                    }
                });
            },

            
            

            SaveEmployeeGrid: function (control) {
                if ($("#" + control).pqGrid("instance")) {
                    // $("#" + control).pqGrid("destroy");
                    $("#" + control).pqGrid('option', 'dataModel.data', ko.toJS(self.EmployeeDataList()));
                    $("#" + control).pqGrid('refreshDataAndView');
                } else {
                    const options = Object.assign({}, pqOptions);
                    options.colModel = [
                       
                        { title: "FirstName", align: "center", dataIndx: "FirstName",  width: "15%" },
                        { title: "LastName", align: "center", dataIndx: "LastName", width: "15%" },
                        { title: "Phone", align: "center", dataIndx: "Phone", width: "15%" },
                        { title: "Email", align: "center", dataIndx: "Email", width: "15%" },                      
                        { title: "JobTitle", align: "center", dataIndx: "JobTitle", width: "20%" },                       
                        
                        {
                            title: "Action", align: "center", width: "20%", render: function (ui) {

                                return `<button class="btn btn-danger" style="color:black" onclick="obj.employeedelete(${ui.rowIndx});" type="button">delete</button> <button class="btn btn-info " style="color:black" onclick="obj.employeeedit(${ui.rowIndx});" type="button">Edit</button>`;
                            }
                        }


                    ];

                    options.dataModel = { data: ko.toJS(self.EmployeeDataList()) };
                    options.showBottom = true;
                    $("#" + control).pqGrid(options);

                    // self.MyModel().Name('');
                    // self.MyModel().Age('');
                }
            },

            SaveCustomerGrid: function (control) {
                if ($("#" + control).pqGrid("instance")) {
                    
                    $("#" + control).pqGrid('option', 'dataModel.data', ko.toJS(self.CustomerDataList()));
                    $("#" + control).pqGrid('refreshDataAndView');
                } else {
                    const options = Object.assign({}, pqOptions);
                    options.colModel = [
                        
                        { title: "Customer Name", align: "center", dataIndx: "Name", width: "15%" },
                        { title: "Address", align: "center", dataIndx: "Address1", width: "20%" },
                        { title: "Phone", align: "center", dataIndx: "Phone", width: "15%" },
                        { title: "City", align: "Center", dataIndx: "CityName", width: "15%" },
                        { title: "PostalCode", align: "Center", dataIndx: "PostalCode", width: "15%" },

                        {
                            title: "Action", align: "center", width: "20%", render: function (ui) {

                                return `<button class="btn btn-danger" style="color:black" onclick="obj.customerdelete(${ui.rowIndx});" type="button">delete</button> <button class="btn btn-info " style="color:black" onclick="obj.customeredit(${ui.rowIndx});" type="button">Edit</button>`;
                            }
                        }


                    ];

                    options.dataModel = { data: ko.toJS(self.CustomerDataList()) };
                    options.showBottom = true;
                    $("#" + control).pqGrid(options);

                    
                }
            },

            SaveOrderGrid: function (control) {
                if ($("#" + control).pqGrid("instance")) {
                    // $("#" + control).pqGrid("destroy");
                    $("#" + control).pqGrid('option', 'dataModel.data', ko.toJS(self.OrderDataList()));
                    $("#" + control).pqGrid('refreshDataAndView');
                } else {
                    const options = Object.assign({}, pqOptions);
                    options.colModel = [

                        { title: "OrderProductName ", align: "center", dataIndx: "OrderProductName", width: "25%" },
                        { title: "OrderDate", align: "center", dataIndx: "OrderDate", width: "25%" },
                        { title: "SubmissionDate", align: "center", dataIndx: "SubmissionDate", width: "25%" },
                        
                        {
                            title: "Action", align: "center", width: "25%", render: function (ui) {

                                return `<button class="btn btn-danger" style="color:black" onclick="obj.orderdelete(${ui.rowIndx});" type="button">delete</button> <button class="btn btn-info " style="color:black" onclick="obj.orderedit(${ui.rowIndx});" type="button">Edit</button>`;
                            }
                        }


                    ];

                    options.dataModel = { data: ko.toJS(self.OrderDataList()) };
                    options.showBottom = true;
                    $("#" + control).pqGrid(options);

                    // self.MyModel().Name('');
                    // self.MyModel().Age('');
                }
            },

            SaveAllinfogrid: function (control) {
                if ($("#" + control).pqGrid("instance")) {
                    // $("#" + control).pqGrid("destroy");
                    $("#" + control).pqGrid('option', 'dataModel.data', ko.toJS(self.AllDataList()));
                    $("#" + control).pqGrid('refreshDataAndView');
                } else {
                    const options = Object.assign({}, pqOptions);
                    options.height = 400;
                    options.colModel = [
                        { title: "OfficeName", align: "center", dataIndx: "OfficeName", width: "10%" },
                        { title: "PANnumber", align: "center", dataIndx: "PANnumber", width: "10%" },
                        { title: "StreetAddress", align: "center", dataIndx: "StreetAddress", width: "10%" },
                        { title: "City", align: "Center", dataIndx: "CityName", width: "10%" },
                        { title: "Phone", align: "Center", dataIndx: "Phone", width: "12%" },
                        { title: "Province", align: "Center", dataIndx: "ProvinceName", width: "10%" },
                        { title: "PostalCode", align: "Center", dataIndx: "PostalCode", width: "8%" },
                        { title: "Country", align: "Center", dataIndx: "CountryName", width: "10%" },
                        {
                            title: "Action", align: "center", width: "20%", render: function (ui) {

                                return `<button class="btn btn-danger" onclick="obj.infoDelete(${ui.rowData.ID});" type="button">delete</button> <button class="btn btn-info " onclick="obj.infoEdit(${ui.rowData.ID});" type="button">Edit</button>`;
                            }
                        }


                    ];

                    options.dataModel = { data: ko.toJS(self.AllDataList()) };
                    options.showBottom = true;
                    $("#" + control).pqGrid(options);


                }
            },

           
           
           
           
        },


    };
    self.New = function () {

        self.btnsavenew(false);
        self.btnsavesubmit(true);
        self.btnclearsubmit(true);
        self.btnemployeesubmit(true);
        self.btnemployeeupdate(false);
        self.btncustomersubmit(true);
        self.btncustomerupdate(false);
        self.btnordersubmit(true);
        self.btnorderupdate(false);
        self.enabledisable(true);
    }
    self.Clear = function () {
        UiEvents.clear.ResetAll();
    };

    self.Search = function () {
        var officename = self.SearchField();
        UiEvents.functions.Search(officename);
    };

    


    function Init() {
        models.UiElements();

        UiEvents.clear.ResetAll();

        $("#tabs").tabs(); 
        
        UiEvents.functions.SaveEmployeeGrid("EmployeeGrid");
        UiEvents.functions.SaveOrderGrid("OrderGrid");
        
        UiEvents.functions.Alldropdown();
        
        
        $(" #tabs, #tabs-6").click(function () {

            UiEvents.functions.GetAllData("RemoteInfoGrid");

        });

        $(" #tabs, #tabs-7").click(function () {
            UiEvents.functions.SaveAllinfogrid("AllInfoGrid");
            UiEvents.functions.GetOfficeinfo();

        });

        $("#subtabs").tabs();
        

        $(" #subtabs, #tabs-2").click(function () {

            UiEvents.functions.SaveEmployeeGrid("EmployeeGrid");
            
        });

        $(" #subtabs, #tabs-3").click(function () {

            UiEvents.functions.SaveCustomerGrid("CustomerGrid");
            UiEvents.functions.SaveOrderGrid("OrderGrid");
        });
       
    }
    Init();
}

var obj;

$(document).ready(function () {
    obj = new OfficeVM();
    ko.applyBindings(obj);

});
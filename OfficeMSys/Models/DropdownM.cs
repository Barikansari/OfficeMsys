using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OfficeMSys.Models
{
    public class DropdownM
    {

        public List<CityM> CityMList { get; set; }
        public List<ProvinceM> ProvinceMList { get; set; }
        public List<CountryM> CountryMList { get; set; }
    }
}
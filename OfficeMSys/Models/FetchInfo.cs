using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OfficeMSys.Models
{
    public class FetchInfo
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string OfficeName { get; set; }
        [Required]
        public string PANnumber { get; set; }

        [Required]
        public string StreetAddress { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public int CityId { get; set; }

        [Required]
        public string CityName { get; set; }
        [Required]
        public int ProvinceId { get; set; }

        [Required]
        public string ProvinceName { get; set; }

        [Required]
        public int CountryId { get; set; }

        [Required]
        public string CountryName { get; set; }
    }
}
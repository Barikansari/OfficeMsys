using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OfficeMSys.Models
{
    public class ProvinceM
    {
        [Key]
        public int ProvinceId { get; set; }
        [Required]
        public string ProvinceName { get; set; }
    }
}
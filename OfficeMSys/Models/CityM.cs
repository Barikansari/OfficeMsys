using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OfficeMSys.Models
{
    public class CityM
    {
        [Key]
        public int CityId { get; set; }

        [Required]
        public string CityName { get; set; }
    }
}
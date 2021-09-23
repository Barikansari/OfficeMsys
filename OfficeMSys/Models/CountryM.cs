using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OfficeMSys.Models
{
    public class CountryM
    {
        [Key]
        public int CountryId { get; set; }

        [Required]
        public string CountryName { get; set; }
    }
}
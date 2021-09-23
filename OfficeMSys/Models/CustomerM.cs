using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OfficeMSys.Models
{
    public class CustomerM
    {
        [Key]
        public int CustomerID { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Address1 { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public int CityId { get; set; }

        [Required]
        public string CityName { get; set; }
        public List<OrderProduct> OrderList { get; set; }
        
    }
}
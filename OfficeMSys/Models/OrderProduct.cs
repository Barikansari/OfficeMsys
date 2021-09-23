using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OfficeMSys.Models
{
    public class OrderProduct
    {
        [Key]
        public int OrderID { get; set; }

        [Required]
        public string OrderProductName { get; set; }

        [Required]
        public string OrderDate { get; set; }
        [Required]
        public string SubmissionDate { get; set; }

        [Required]
        public int CustomerID { get; set; }

        
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DigitalBanking.WebApi.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string IBAN { get; set; }
        public Amount Balance { get; set; }
        public AccountTypeEnum Type { get; set; }
    }

    public enum AccountTypeEnum
    {
        Deposit, Saving, Demand, Term
    }

    public class Amount
    {
        public int Value { get; set; }
        public Currency Currency { get; set; }
    }

    public class Currency
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
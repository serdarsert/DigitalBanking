using DigitalBanking.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DigitalBanking.WebApi
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<Account> Get()
        {
            List<Account> accounts = new List<Account>();
            for (int i = 0; i < 5; i++)
            {
                Account acc = new Account();
                acc.Balance = new Amount { Value = i * new Random().Next(100000), Currency = new Currency { Code = "TL", Name = "TL" } };
                acc.IBAN = "TR850006701000000085014121";
                acc.Id = i + 1;
                acc.Name = "Test Account" + i + 1;
                acc.Type = (AccountTypeEnum)new Random().Next(3);
                accounts.Add(acc);
            }
            return accounts;
        }

        // GET api/<controller>/5
        public Account Get(int id)
        {
            return Get().FirstOrDefault(a => a.Id == id);
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}
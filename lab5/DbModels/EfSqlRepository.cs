using lab6.DbModels.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace lab6.DbModels
{
    public class EfSqlRepository
    {
        public async void AddNewUser(UserTable userTable)
        {
            using(var ctxt = GetContext())
            {
                ctxt.UserTable.Add(userTable);
                await ctxt.SaveChangesAsync();
            }
        }
        public List<UserTable> GetUsers()
        {
            using (var ctxt = GetContext())
            {
                return ctxt.UserTable.ToList();
            }
        }
        public async void UpdateUser(UserTable user)
        {
            using (var ctxt = GetContext())
            {
                ctxt.UserTable.Update(user);
                await ctxt.SaveChangesAsync();
            }
        }
        public async void DeleteUser(UserTable user)
        {
            using (var ctxt = GetContext())
            {
                ctxt.UserTable.Remove(user);
                await ctxt.SaveChangesAsync();
            }
        }
        protected EfDbContext GetContext()
        {
            return new EfDbContext();
        }
    }
}

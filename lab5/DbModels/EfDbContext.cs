using lab6.DbModels.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data.Entity;

namespace lab6.DbModels
{
    public class EfDbContext: Microsoft.EntityFrameworkCore.DbContext
    {
        private static readonly string _connectionString = "Data Source=DESKTOP-SM098C1;Initial Catalog=lab6;Integrated Security=True";
        public EfDbContext()
        {

        }
        public Microsoft.EntityFrameworkCore.DbSet<UserTable> UserTable { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer(_connectionString);
            base.OnConfiguring(builder);
        }
    }
}

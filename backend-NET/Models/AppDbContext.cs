using Microsoft.EntityFrameworkCore;

namespace backend_NET.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<MeterReading> MeterReadings { get; set; }
        public DbSet<User> Users { get; set; }
        // add other tables here


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}

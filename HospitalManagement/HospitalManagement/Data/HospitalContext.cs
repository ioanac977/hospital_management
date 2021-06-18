using HospitalManagement.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
namespace HospitalManagement.Data
{
    public class HospitalContext : DbContext
    {
        public HospitalContext(DbContextOptions<HospitalContext> options) : base(options)
        {
        }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Patient>().ToTable("Patient");
            modelBuilder.Entity<User>().ToTable("User");

        }

    }
}

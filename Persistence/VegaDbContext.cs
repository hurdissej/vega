using Microsoft.EntityFrameworkCore;
using vega.Core.Models;
using vega.Models;

namespace vega.Persistence
{
    public class VegaDbContext: DbContext
    {
        public DbSet<Make> Make { get; set; }
        public DbSet<Feature> Feature { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public Model Models { get; set; }


        public VegaDbContext(DbContextOptions<VegaDbContext>  options): base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<VehicleFeature>().HasKey(vf => new {
                vf.VehicleId, vf.FeatureId});
        }
    }
}
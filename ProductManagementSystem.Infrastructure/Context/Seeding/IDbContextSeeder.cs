
namespace ProductManagementSystem.Infrastructure.Context.Seeding;

public interface IDbContextSeeder
{
    Task SeedAsync(ApplicationDbContext dbContext);
}

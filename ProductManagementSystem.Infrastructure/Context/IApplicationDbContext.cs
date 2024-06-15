
using ProductManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ProductManagementSystem.Infrastructure.Context
{
    public interface IApplicationDbContext
    {
        DbSet<Product> Products { get; }
        DbSet<Category> Categories { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}

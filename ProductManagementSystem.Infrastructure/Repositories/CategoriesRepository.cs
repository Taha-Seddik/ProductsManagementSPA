using Microsoft.EntityFrameworkCore;
using ProductManagementSystem.Application.Common.Interfaces;
using ProductManagementSystem.Domain.Entities;
using ProductManagementSystem.Infrastructure.Context;

namespace ProductManagementSystem.Infrastructure.Repositories;

public class CategoriesRepository : GenericRepository<Category>, ICategoriesRepository
{
    public CategoriesRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Category>> ListAllFilled(CancellationToken cancellationToken)
    {
        return await _context.Categories.AsNoTracking().Include(x => x.Products).ToListAsync();
    }

}

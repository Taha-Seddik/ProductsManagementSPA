using ProductManagementSystem.Application.Common.Interfaces;
using ProductManagementSystem.Domain.Entities;
using ProductManagementSystem.Infrastructure.Context;

namespace ProductManagementSystem.Infrastructure.Repositories;

public class ProductsRepository : GenericRepository<Product>, IProductsRepository
{
    public ProductsRepository(ApplicationDbContext context) : base(context)
    {
    }

    /*public async Task<IEnumerable<Product>> ListAllWithUserFilled(CancellationToken cancellationToken)
    {
        return await _context.Employees.AsNoTracking().Include(x => x.User).ToListAsync();
    }

    public async Task<Product?> GetOneWithUserFilled(int empId, CancellationToken cancellationToken)
    {
        return await _context.Employees.Where(x => x.Id == empId).Include(x => x.User).FirstOrDefaultAsync(cancellationToken);
    }*/

}

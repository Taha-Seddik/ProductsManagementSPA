using Microsoft.EntityFrameworkCore;
using ProductManagementSystem.Application.Common.Interfaces;
using ProductManagementSystem.Domain.Entities;
using ProductManagementSystem.Infrastructure.Context;

namespace ProductManagementSystem.Infrastructure.Repositories;

public class ProductsRepository : GenericRepository<Product>, IProductsRepository
{
    public ProductsRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Product>> ListAllWithCategoryFilled(CancellationToken cancellationToken)
    {
        return await _context.Products.AsNoTracking().Include(x => x.Category).ToListAsync();
    }

    public async Task<Product?> GetOneWithCategoryFilled(string pId, CancellationToken cancellationToken)
    {
        return await _context.Products.Where(x => x.Id == pId).Include(x => x.Category).FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<bool> ISBNDoesntExists(string newISBN, CancellationToken cancellationToken)
    {
        return await _context.Products.AllAsync(x => x.ISBN != newISBN, cancellationToken);
    }

    
}

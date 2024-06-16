using ProductManagementSystem.Domain.Entities;

namespace ProductManagementSystem.Application.Common.Interfaces;

public interface IProductsRepository : IGenericRepository<Product>
{
    Task<IEnumerable<Product>> ListAllWithCategoryFilled(CancellationToken cancellationToken);
    Task<Product?> GetOneWithCategoryFilled(string pId, CancellationToken cancellationToken);
    Task<bool> ISBNDoesntExists(string isbn, CancellationToken cancellationToken);

}

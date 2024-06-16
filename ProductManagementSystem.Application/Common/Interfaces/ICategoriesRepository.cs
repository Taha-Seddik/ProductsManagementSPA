using ProductManagementSystem.Domain.Entities;

namespace ProductManagementSystem.Application.Common.Interfaces;

public interface ICategoriesRepository : IGenericRepository<Category>
{
    Task<IEnumerable<Category>> ListAllFilled(CancellationToken cancellationToken);
}
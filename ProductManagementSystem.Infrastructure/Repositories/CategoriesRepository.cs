using ProductManagementSystem.Application.Common.Interfaces;
using ProductManagementSystem.Domain.Entities;
using ProductManagementSystem.Infrastructure.Context;

namespace ProductManagementSystem.Infrastructure.Repositories;

public class CategoriesRepository : GenericRepository<Category>, ICategoriesRepository
{
    public CategoriesRepository(ApplicationDbContext context) : base(context)
    {
    }

}

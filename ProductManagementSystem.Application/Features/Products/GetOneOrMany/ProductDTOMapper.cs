using AutoMapper;
using ProductManagementSystem.Domain.Entities;

namespace ProductManagementSystem.Application.Features.Products.GetOneOrMany;

public class CategoryDTOMapper : Profile
{
    public CategoryDTOMapper()
    {
        CreateMap<Product, ProductDTO>();
    }
}

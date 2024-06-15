using AutoMapper;
using ProductManagementSystem.Domain.Entities;

namespace ProductManagementSystem.Application.Features.Categories.GetOneOrMany;

public class CategoryDTOMapper : Profile
{
    public CategoryDTOMapper()
    {
        CreateMap<Category, CategoryDTO>();
    }
}

using AutoMapper;
using ProductManagementSystem.Domain.Entities;

namespace ProductManagementSystem.Application.Features.Categories.Create;

public class CreateCategoryMapper : Profile
{
    public CreateCategoryMapper()
    {
        CreateMap<CreateCategoryCommand, Category>();
    }
}
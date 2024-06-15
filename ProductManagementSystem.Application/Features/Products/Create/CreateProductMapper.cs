using AutoMapper;
using ProductManagementSystem.Domain.Entities;

namespace ProductManagementSystem.Application.Features.Products.Create;

public class CreateCategoryMapper : Profile
{
    public CreateCategoryMapper()
    {
        CreateMap<CreateProductCommand, Product>();
    }
}
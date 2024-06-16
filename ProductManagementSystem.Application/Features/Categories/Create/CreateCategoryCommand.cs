using AutoMapper;
using MediatR;
using ProductManagementSystem.Domain.Entities;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Categories.Create;

public class CreateCategoryCommand : IRequest<string>
{
    public string NameEn { get; set; }
    public string NameAr { get; set; }
}

public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, string>
{
    private readonly IMapper _mapper;
    private readonly ICategoriesRepository _categoriesRepo;

    public CreateCategoryCommandHandler(ICategoriesRepository categoriesRepo, IMapper mapper)
    {
        _categoriesRepo = categoriesRepo;
        _mapper = mapper;
    }

    public async Task<string> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        var newCategory = _mapper.Map<Category>(request);
        newCategory.Id = Guid.NewGuid().ToString();
        newCategory = await _categoriesRepo.AddAsync(newCategory, cancellationToken);
        return newCategory.Id;
    }
}


using AutoMapper;
using MediatR;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Categories.GetOneOrMany;

public class GetOneCategoryQueryResponse
{
    public CategoryDTO Category { get; set; }
}

public class GetOneCategoryQuery : IRequest<GetOneCategoryQueryResponse>
{
    public string CategoryId { get; set; }
}

public class GetOneCategoryQueryHandler : IRequestHandler<GetOneCategoryQuery, GetOneCategoryQueryResponse>
{
    private readonly IMapper _mapper;
    private readonly ICategoriesRepository _categoriesRepo;

    public GetOneCategoryQueryHandler(ICategoriesRepository categoriesRepo, IMapper mapper)
    {
        _categoriesRepo = categoriesRepo;
        _mapper = mapper;
    }

    public async Task<GetOneCategoryQueryResponse> Handle(GetOneCategoryQuery request, CancellationToken cancellationToken)
    {
        var c = await _categoriesRepo.GetByIdAsync(request.CategoryId, cancellationToken);
        if (c == null)
        {
            throw new InvalidOperationException("Categor not found");
        }
        var dto = _mapper.Map<CategoryDTO>(c);
        return new GetOneCategoryQueryResponse()
        {
            Category = dto
        };
    }
}




using AutoMapper;
using MediatR;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Categories.GetOneOrMany;

public class ListAllCategorysQueryResponse
{
    public IEnumerable<CategoryDTO> Categories { get; set; }
}

public class ListAllCategorysQuery : IRequest<ListAllCategorysQueryResponse>
{}

public class ListAllCategorysQueryHandler : IRequestHandler<ListAllCategorysQuery, ListAllCategorysQueryResponse>
{
    private readonly IMapper _mapper;
    private readonly ICategoriesRepository _categoriesRepo;

    public ListAllCategorysQueryHandler(ICategoriesRepository categoriesRepo, IMapper mapper)
    {
        _categoriesRepo = categoriesRepo;
        _mapper = mapper;
    }

    public async Task<ListAllCategorysQueryResponse> Handle(ListAllCategorysQuery request, CancellationToken cancellationToken)
    {
        var categs = await _categoriesRepo.ListAllAsync(cancellationToken);
        var dtos = categs.Select(_mapper.Map<CategoryDTO>).ToList().AsReadOnly();
        return new ListAllCategorysQueryResponse()
        {
            Categories = dtos
        };
    }
}




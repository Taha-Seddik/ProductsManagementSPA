using AutoMapper;
using MediatR;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Categories.GetOneOrMany;

public class ListCategoriesFilledQueryResponse
{
    public IEnumerable<CategoryFilledDTO> Categories { get; set; }
}

public class ListCategoriesFilledQuery : IRequest<ListCategoriesFilledQueryResponse>
{}

public class ListCategoriesFilledQueryHandler : IRequestHandler<ListCategoriesFilledQuery, ListCategoriesFilledQueryResponse>
{
    private readonly IMapper _mapper;
    private readonly ICategoriesRepository _categoriesRepo;

    public ListCategoriesFilledQueryHandler(ICategoriesRepository categoriesRepo, IMapper mapper)
    {
        _categoriesRepo = categoriesRepo;
        _mapper = mapper;
    }

    public async Task<ListCategoriesFilledQueryResponse> Handle(ListCategoriesFilledQuery request, CancellationToken cancellationToken)
    {
        var categs = await _categoriesRepo.ListAllFilled(cancellationToken);
        var dtos = categs.Select(x =>
        {
            var basicDto = _mapper.Map<CategoryFilledDTO>(x);
            basicDto.Products = x.Products.Select(y =>
            {
                return new CategoryProductDTO()
                {
                    Id = y.Id,
                    Name = y.Name,
                };
            });
            return basicDto;
        }).ToList().AsReadOnly();
        return new ListCategoriesFilledQueryResponse()
        {
            Categories = dtos
        };
    }
}




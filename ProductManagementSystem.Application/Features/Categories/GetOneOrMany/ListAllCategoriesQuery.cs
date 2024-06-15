using AutoMapper;
using MediatR;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Categories.GetOneOrMany;

public class ListAllCategorysQueryResponse
{
    public IEnumerable<CategoryDTO> Categorys { get; set; }
}

public class ListAllCategorysQuery : IRequest<ListAllCategorysQueryResponse>
{}

public class ListAllCategorysQueryHandler : IRequestHandler<ListAllCategorysQuery, ListAllCategorysQueryResponse>
{
    private readonly IMapper _mapper;
    private readonly ICategoriesRepository _categorysRepo;

    public ListAllCategorysQueryHandler(ICategoriesRepository categorysRepo, IMapper mapper)
    {
        _categorysRepo = categorysRepo;
        _mapper = mapper;
    }

    public async Task<ListAllCategorysQueryResponse> Handle(ListAllCategorysQuery request, CancellationToken cancellationToken)
    {
        throw new InvalidOperationException("Not implemented");
        /*var categorys = await _categorysRepo.ListAllWithUserFilled(cancellationToken);
        var dtos = categorys.Select(x =>
        {
            var basicDto = _mapper.Map<CategoryDTO>(x);
            basicDto.FirstName = x.User.FirstName;
            basicDto.LastName = x.User.LastName;
            basicDto.Email = x.User.Email!;
            return basicDto;
        }).ToList().AsReadOnly();

        return new ListAllCategorysQueryResponse()
        {
            Categorys = dtos
        };*/
    }
}




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
    public int CategoryId { get; set; }
}

public class GetOneCategoryQueryHandler : IRequestHandler<GetOneCategoryQuery, GetOneCategoryQueryResponse>
{
    private readonly IMapper _mapper;
    private readonly ICategoriesRepository _categorysRepo;

    public GetOneCategoryQueryHandler(ICategoriesRepository categorysRepo, IMapper mapper)
    {
        _categorysRepo = categorysRepo;
        _mapper = mapper;
    }

    public async Task<GetOneCategoryQueryResponse> Handle(GetOneCategoryQuery request, CancellationToken cancellationToken)
    {
        throw new InvalidOperationException("Not implemented");
        /* var foundEmp = await _categorysRepo.GetOneWithUserFilled(request.CategoryId, cancellationToken);
         if(foundEmp == null)
         {
             throw new InvalidOperationException("Category not found");
         }
         var basicDto = _mapper.Map<CategoryDTO>(foundEmp);
         basicDto.FirstName = foundEmp.User.FirstName;
         basicDto.LastName = foundEmp.User.LastName;
         basicDto.Email = foundEmp.User.Email!;
         return new GetOneCategoryQueryResponse()
         {
             Category = basicDto
         };*/
    }
}




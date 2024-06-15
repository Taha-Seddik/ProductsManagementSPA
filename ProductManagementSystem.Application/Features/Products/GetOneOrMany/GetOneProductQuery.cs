using AutoMapper;
using MediatR;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Products.GetOneOrMany;

public class GetOneProductQueryResponse
{
    public ProductDTO Product { get; set; }
}

public class GetOneProductQuery : IRequest<GetOneProductQueryResponse>
{
    public int ProductId { get; set; }
}

public class GetOneProductQueryHandler : IRequestHandler<GetOneProductQuery, GetOneProductQueryResponse>
{
    private readonly IMapper _mapper;
    private readonly IProductsRepository _productsRepo;

    public GetOneProductQueryHandler(IProductsRepository productsRepo, IMapper mapper)
    {
        _productsRepo = productsRepo;
        _mapper = mapper;
    }

    public async Task<GetOneProductQueryResponse> Handle(GetOneProductQuery request, CancellationToken cancellationToken)
    {
        throw new InvalidOperationException("Not implemented");
        /*var foundEmp = await _productsRepo.GetOneWithUserFilled(request.ProductId, cancellationToken);
        if(foundEmp == null)
        {
            throw new InvalidOperationException("Product not found");
        }
        var basicDto = _mapper.Map<ProductDTO>(foundEmp);
        basicDto.FirstName = foundEmp.User.FirstName;
        basicDto.LastName = foundEmp.User.LastName;
        basicDto.Email = foundEmp.User.Email!;
        return new GetOneProductQueryResponse()
        {
            Product = basicDto
        };*/
    }
}




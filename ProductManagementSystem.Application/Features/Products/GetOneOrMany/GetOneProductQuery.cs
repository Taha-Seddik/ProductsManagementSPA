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
        var p = await _productsRepo.GetOneWithCategoryFilled(cancellationToken);
        if (p == null)
        {
            throw new InvalidOperationException("Product not found");
        }
        var dto = _mapper.Map<ProductDTO>(p);
        return new GetOneProductQueryResponse()
        {
            Product = dto
        };
    }
}




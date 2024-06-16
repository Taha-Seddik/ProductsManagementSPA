using AutoMapper;
using MediatR;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Products.GetOneOrMany;

public class ListAllProductsQueryResponse
{
    public IEnumerable<ProductDTO> Products { get; set; }
}

public class ListAllProductsQuery : IRequest<ListAllProductsQueryResponse>
{}

public class ListAllProductsQueryHandler : IRequestHandler<ListAllProductsQuery, ListAllProductsQueryResponse>
{
    private readonly IMapper _mapper;
    private readonly IProductsRepository _productsRepo;

    public ListAllProductsQueryHandler(IProductsRepository productsRepo, IMapper mapper)
    {
        _productsRepo = productsRepo;
        _mapper = mapper;
    }

    public async Task<ListAllProductsQueryResponse> Handle(ListAllProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await _productsRepo.ListAllWithCategoryFilled(cancellationToken);
        var dtos = products.Select(_mapper.Map<ProductDTO>).ToList().AsReadOnly();
        return new ListAllProductsQueryResponse()
        {
            Products = dtos
        };
    }
}




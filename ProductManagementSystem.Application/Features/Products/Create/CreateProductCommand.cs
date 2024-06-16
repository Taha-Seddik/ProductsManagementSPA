using AutoMapper;
using MediatR;
using ProductManagementSystem.Application.Common.Interfaces;
using ProductManagementSystem.Domain.Entities;

namespace ProductManagementSystem.Application.Features.Products.Create;

public class CreateProductCommand : IRequest<string>
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string ISBN { get; set; }
    public string CategoryId { get; set; }
}

public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, string>
{
    private readonly IMapper _mapper;
    private readonly IProductsRepository _productsRepo;

    public CreateProductCommandHandler(IProductsRepository productsRepo, IMapper mapper)
    {
        _productsRepo = productsRepo;
        _mapper = mapper;
    }

    public async Task<string> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        // map request to product entity
        var newProduct = _mapper.Map<Product>(request);
        newProduct.Id = Guid.NewGuid().ToString();
        newProduct = await _productsRepo.AddAsync(newProduct, cancellationToken);
        return newProduct.Id;
    }
}


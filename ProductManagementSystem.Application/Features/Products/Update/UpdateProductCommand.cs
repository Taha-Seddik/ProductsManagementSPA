using MediatR;
using Microsoft.AspNetCore.Identity;
using ProductManagementSystem.Application.Common.Interfaces;
using ProductManagementSystem.Domain.Entities;

namespace ProductManagementSystem.Application.Features.Products.Update;

public class UpdateProductCommand : IRequest
{
    public string ProductId { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string ISBN { get; set; }
    public string CategoryId { get; set; }
}

public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand>
{
    private readonly IProductsRepository _productsRepo;

    public UpdateProductCommandHandler(IProductsRepository productsRepo)
    {
        _productsRepo = productsRepo;
    }

    public async Task Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        // Update product infos
        var entity = await _productsRepo.GetByIdAsync(request.ProductId, cancellationToken);
        if (entity == null) {
            throw new InvalidOperationException("Product not found");
        }
        entity.Name = request.Name;
        entity.Price = request.Price;
        entity.ISBN = request.ISBN;
        entity.CategoryId = request.CategoryId;
        await _productsRepo.UpdateAsync(entity, cancellationToken);
    }
}
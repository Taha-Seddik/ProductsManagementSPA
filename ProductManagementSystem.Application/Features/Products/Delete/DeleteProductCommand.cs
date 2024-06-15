using MediatR;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Products.Delete;

public class DeleteProductCommand : IRequest
{
    public int ProductId { get; set; }
}

public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand>
{
    private readonly IProductsRepository _productsRepo;

    public DeleteProductCommandHandler(IProductsRepository productsRepo)
    {
        _productsRepo = productsRepo;
    }

    public async Task Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var entity = await _productsRepo.GetByIdAsync(request.ProductId, cancellationToken);
        await _productsRepo.DeleteAsync(entity!, cancellationToken);
    }
}
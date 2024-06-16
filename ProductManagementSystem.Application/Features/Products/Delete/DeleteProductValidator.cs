using FluentValidation;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Products.Delete;

public class DeleteCategoryValidator : AbstractValidator<DeleteProductCommand>
{
    private readonly IProductsRepository _productsRepo;

    public DeleteCategoryValidator(IProductsRepository productsRepo)
    {
        _productsRepo = productsRepo;

        RuleFor(v => v.ProductId)
            .NotEmpty().WithMessage("ProductId is required.")
            .MustAsync(ProductShouldExists).WithMessage("The specified Product Id should exists.");
    }

    public async Task<bool> ProductShouldExists(string pId, CancellationToken cancellationToken)
    {
        return await _productsRepo.GetByIdAsync(pId, cancellationToken) != null;
    }
}
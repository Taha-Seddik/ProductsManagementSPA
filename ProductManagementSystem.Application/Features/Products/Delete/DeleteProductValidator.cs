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
            .NotNull().WithMessage("ProductId is required.")
            .MustAsync(ProductShouldExists).WithMessage("The specified Product Id should exists.");
    }

    public async Task<bool> ProductShouldExists(int empId, CancellationToken cancellationToken)
    {
        return await _productsRepo.GetByIdAsync(empId, cancellationToken) != null;
    }
}
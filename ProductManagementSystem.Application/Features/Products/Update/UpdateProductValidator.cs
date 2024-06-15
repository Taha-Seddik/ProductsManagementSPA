using FluentValidation;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Products.Update;

public class UpdateCategoryValidator : AbstractValidator<UpdateProductCommand>
{
    private readonly IProductsRepository _productsRepo;

    public UpdateCategoryValidator(IProductsRepository productsRepo)
    {
        _productsRepo = productsRepo;

        RuleFor(v => v.ProductId)
         .GreaterThan(0).WithMessage("ProductId is required.")
          .MustAsync(ProductShouldExists).WithMessage("The specified Product Id should exists.");
    }

    public async Task<bool> ProductShouldExists(int empId, CancellationToken cancellationToken)
    {
        return await _productsRepo.GetByIdAsync(empId, cancellationToken) != null;
    }
}

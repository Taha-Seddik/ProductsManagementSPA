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
          .NotEmpty().WithMessage("ProductId is required.")
          .MustAsync(ProductShouldExists).WithMessage("The specified Product Id should exists.");

        RuleFor(model => model.Name)
           .NotEmpty().WithMessage("Name is required.")
           .MustAsync(BeUniqueISBN).WithMessage("ISBN should be unique");

        RuleFor(model => model.Price)
           .NotEmpty().WithMessage("Price is required.");

        RuleFor(model => model.ISBN)
           .NotEmpty().WithMessage("LastName is required.");

        RuleFor(v => v.CategoryId)
            .NotNull().WithMessage("Category Id is required.")
            .MustAsync(CategoryShouldExists).WithMessage("The specified Category should exists.");
    }

    public async Task<bool> ProductShouldExists(string pId, CancellationToken cancellationToken)
    {
        return await _productsRepo.GetByIdAsync(pId, cancellationToken) != null;
    }

    public async Task<bool> BeUniqueISBN(string newISBN, CancellationToken token)
    {
        return await _productsRepo.ISBNDoesntExists(newISBN, token);
    }

    public async Task<bool> CategoryShouldExists(string categoryId, CancellationToken cancellationToken)
    {
        return await _productsRepo.GetByIdAsync(categoryId, cancellationToken) != null;
    }
}

using FluentValidation;
using Microsoft.AspNetCore.Identity;
using ProductManagementSystem.Application.Common.Interfaces;
using ProductManagementSystem.Domain.Entities;

namespace ProductManagementSystem.Application.Features.Products.Create;

public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
{
    private readonly IProductsRepository _productsRepository;
    private readonly ICategoriesRepository _categoriesRepository;

    public CreateProductCommandValidator(IProductsRepository productsRepository, ICategoriesRepository categoriesRepository)
    {
        _productsRepository = productsRepository;
        _categoriesRepository = categoriesRepository;

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

    public async Task<bool> BeUniqueISBN(string newISBN, CancellationToken token)
    {
       return await _productsRepository.ISBNDoesntExists(newISBN, token);
    }

    public async Task<bool> CategoryShouldExists(string categoryId, CancellationToken cancellationToken)
    {
        return await _categoriesRepository.GetByIdAsync(categoryId, cancellationToken) != null;
    }

}



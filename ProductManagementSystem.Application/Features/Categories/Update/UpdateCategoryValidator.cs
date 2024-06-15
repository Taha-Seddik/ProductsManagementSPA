using FluentValidation;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Categories.Update;

public class UpdateCategoryValidator : AbstractValidator<UpdateCategoryCommand>
{
    private readonly ICategoriesRepository _productsRepo;

    public UpdateCategoryValidator(ICategoriesRepository productsRepo)
    {
        _productsRepo = productsRepo;

        RuleFor(v => v.CategoryId)
         .GreaterThan(0).WithMessage("CategoryId is required.")
          .MustAsync(CategoryShouldExists).WithMessage("The specified Category Id should exists.");
    }

    public async Task<bool> CategoryShouldExists(int empId, CancellationToken cancellationToken)
    {
        return await _productsRepo.GetByIdAsync(empId, cancellationToken) != null;
    }
}

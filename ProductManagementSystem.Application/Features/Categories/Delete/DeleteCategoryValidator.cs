using FluentValidation;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Categories.Delete;

public class DeleteCategoryValidator : AbstractValidator<DeleteCategoryCommand>
{
    private readonly ICategoriesRepository _categorysRepo;

    public DeleteCategoryValidator(ICategoriesRepository categorysRepo)
    {
        _categorysRepo = categorysRepo;

        RuleFor(v => v.CategoryId)
            .NotNull().WithMessage("CategoryId is required.")
            .MustAsync(CategoryShouldExists).WithMessage("The specified Category Id should exists.");
    }

    public async Task<bool> CategoryShouldExists(int empId, CancellationToken cancellationToken)
    {
        return await _categorysRepo.GetByIdAsync(empId, cancellationToken) != null;
    }
}
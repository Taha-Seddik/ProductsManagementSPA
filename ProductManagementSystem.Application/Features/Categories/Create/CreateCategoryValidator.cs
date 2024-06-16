using FluentValidation;

namespace ProductManagementSystem.Application.Features.Categories.Create;

public class CreateCategoryValidator : AbstractValidator<CreateCategoryCommand>
{
    public CreateCategoryValidator()
    {
        RuleFor(model => model.NameEn)
           .NotEmpty().WithMessage("NameEn is required.");

        RuleFor(model => model.NameAr)
           .NotEmpty().WithMessage("NameAr is required.");
        
    }

}



using MediatR;
using Microsoft.AspNetCore.Identity;
using ProductManagementSystem.Application.Common.Interfaces;
using ProductManagementSystem.Domain.Entities;

namespace ProductManagementSystem.Application.Features.Categories.Update;

public class UpdateCategoryCommand : IRequest
{
    public int CategoryId { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string JobTitle { get; set; }
    public DateTimeOffset JoiningDate { get; set; }
}

public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand>
{
    private readonly ICategoriesRepository _categorysRepo;
    private readonly UserManager<ApplicationUser> _userManager;

    public UpdateCategoryCommandHandler(ICategoriesRepository categorysRepo, UserManager<ApplicationUser> userManager)
    {
        _categorysRepo = categorysRepo;
        _userManager = userManager;
    }

    public async Task Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        // Update user infos
        var user = await _userManager.FindByEmailAsync(request.Email);
        if(user == null)
        {
            throw new InvalidOperationException("User not found");
        }
        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        var updateUserRes = await _userManager.UpdateAsync(user);
        if (!updateUserRes.Succeeded)
        {
            var msg = string.Join(", ", updateUserRes.Errors.Select(x => x.Description));
            throw new InvalidOperationException(msg);
        }
        // Update category infos
        var entity = await _categorysRepo.GetByIdAsync(request.CategoryId, cancellationToken);
        if (entity == null) return;
        /*entity.JobTitle = request.JobTitle;
        entity.Department = request.Department;
        entity.JoiningDate = request.JoiningDate;*/
        await _categorysRepo.UpdateAsync(entity, cancellationToken);
    }
}
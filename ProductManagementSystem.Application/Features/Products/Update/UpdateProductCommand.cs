using MediatR;
using Microsoft.AspNetCore.Identity;
using ProductManagementSystem.Application.Common.Interfaces;
using ProductManagementSystem.Domain.Entities;

namespace ProductManagementSystem.Application.Features.Products.Update;

public class UpdateProductCommand : IRequest
{
    public int ProductId { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string JobTitle { get; set; }
    public DateTimeOffset JoiningDate { get; set; }
}

public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand>
{
    private readonly IProductsRepository _productsRepo;
    private readonly UserManager<ApplicationUser> _userManager;

    public UpdateProductCommandHandler(IProductsRepository productsRepo, UserManager<ApplicationUser> userManager)
    {
        _productsRepo = productsRepo;
        _userManager = userManager;
    }

    public async Task Handle(UpdateProductCommand request, CancellationToken cancellationToken)
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
        // Update product infos
        var entity = await _productsRepo.GetByIdAsync(request.ProductId, cancellationToken);
        if (entity == null) return;
        /*entity.JobTitle = request.JobTitle;
        entity.Department = request.Department;
        entity.JoiningDate = request.JoiningDate;*/
        await _productsRepo.UpdateAsync(entity, cancellationToken);
    }
}
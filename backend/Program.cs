using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddControllers();
        builder.Services.AddControllersWithViews();
        builder.Services.AddCors();
        builder.Services.AddDbContext<EmployeeContext>(options =>
            options.UseSqlServer("Server=DESKTOP-5TCCP6A\\SQLEXPRESS;Database=Todo;Integrated Security=True;MultipleActiveResultSets=True;TrustServerCertificate=True;"));
        builder.Services.AddDbContext<UserContext>(options =>
            options.UseSqlServer("Server=DESKTOP-5TCCP6A\\SQLEXPRESS;Database=Todo;Integrated Security=True;MultipleActiveResultSets=True;TrustServerCertificate=True;"));
        builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();

        var app = builder.Build();

        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        app.UseCors(builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();
        app.UseAuthorization();

        app.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");

        app.UseSwagger();
        app.UseSwaggerUI(e =>
        {
            e.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
            e.RoutePrefix = string.Empty;
            e.DocumentTitle = "My Swagger";
        });

        app.Run();
    }
}

using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
    }

    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}

public class DbContextSingleton<TContext> where TContext : DbContext
{
    private static TContext _instance;

    public static TContext Instance(IServiceProvider serviceProvider)
    {
        if (_instance == null)
        {
            _instance = serviceProvider.GetRequiredService<TContext>();
        }
        return _instance;
    }
}

namespace backend.Models
{
    public class Employee
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Task { get; set; }
        public string? Position { get; set; }
        public bool? Completed { get; set; } = false;
    }

    public class User
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}

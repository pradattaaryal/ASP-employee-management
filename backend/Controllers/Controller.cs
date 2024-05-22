using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();
            if (users == null) return NotFound();
            return Ok(users);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            try
            {
                if (await _userRepository.GetUserAsync(user.Email) != null)
                {
                    return Conflict("Email already exists");
                }

                await _userRepository.AddUserAsync(user);
                return Ok("User registered successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(User user)
        {
            try
            {
                var existingUser = await _userRepository.GetUserAsync(user.Email);

                if (existingUser == null)
                {
                    return NotFound("User not found");
                }

                if (existingUser.Password != user.Password)
                {
                    return Unauthorized("Invalid password");
                }

                var role = user.Email == "pradatta@gmail.com" ? "Admin" : "User";
                return Ok(new { Role = role, Message = "Login successful", email = user.Email });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            var employees = await _employeeRepository.GetEmployeesAsync();
            if (employees == null) return NotFound();
            return Ok(employees);
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<Employee>> GetEmployee(string email)
        {
            var employee = await _employeeRepository.GetEmployeeAsync(email);
            if (employee == null) return NotFound();
            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            await _employeeRepository.AddEmployeeAsync(employee);
            return CreatedAtAction(nameof(GetEmployee), new { email = employee.Email }, employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.ID) return BadRequest();
            await _employeeRepository.UpdateEmployeeAsync(employee);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            await _employeeRepository.DeleteEmployeeAsync(id);
            return Ok();
        }

        [HttpPut("{id}/toggle-completed")]
        public async Task<IActionResult> ToggleCompleted(int id)
        {
            await _employeeRepository.ToggleCompletedAsync(id);
            return Ok();
        }
    }
}

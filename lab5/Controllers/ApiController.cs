using lab5.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using lab6.DbModels;
using Microsoft.AspNetCore.Cors;

namespace lab5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LabController: ControllerBase
    {       
        static List<LoginModel> _users = new List<LoginModel>();
        static EfSqlRepository _repository = new EfSqlRepository();

        /// <summary>
        /// Login user
        /// </summary>
        /// <param ></param>
        /// <returns></returns>
        /// <response code="200">Returns success response</response>
        // [ProducesResponseType(typeof(CommonResponse<UserClientSideData>), 200)]
        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
            var email_checker = new EmailAddressAttribute();
            
            if (loginModel.Password.Length >= 8 && email_checker.IsValid(loginModel.Email) && !string.IsNullOrEmpty(loginModel.Name))
            {
                _users.Add(loginModel);
                _repository.AddNewUser(new lab6.DbModels.Entities.UserTable
                {
                    Name = loginModel.Name,
                    Email = loginModel.Email,
                    Level = loginModel.Level,
                    Password = loginModel.Password,
                    StayAnonim = loginModel.StayAnonim
                });
                var res = _repository.GetUsers();
                return Ok(new ResponceMessage { Message = $"You successfully login!\nYour account name = {loginModel.Name}\nYour email = {loginModel.Email}", Status = true });
            }

            return BadRequest(new ResponceMessage { 
                Message = "There are problems with your data: password must be longer than 8 symbols, email must be real and name can't be empty!",
                Status = false});
        }
       
        /// <summary>
        /// Get battles history
        /// </summary>
        /// <param ></param>
        /// <returns></returns>
        /// <response code="200">Returns success response</response>
        [ProducesResponseType(typeof(List<GamesHistory>), 200)]
        [Route("palyers")]
        [HttpGet]
        public async Task<IActionResult> GetPlayers()
        {
            if(_repository.GetUsers().Count > 1)
                return Ok(_repository.GetUsers().Select(x => new { name = x.Name, email = x.Email}).ToList());
            return NoContent();
        }
        /// <summary>
        /// Update user info
        /// </summary>
        /// <param ></param>
        /// <returns></returns>
        /// <response code="200">Returns success response</response>
        [ProducesResponseType(typeof(ResponceMessage), 200)]
        [Route("update_user_info")]
        [HttpPut]
        public async Task<IActionResult> UpdateUserInfo(LoginModel loginModel)
        {
            foreach (var item in _repository.GetUsers())
            {
                if(item.Email == loginModel.Email)
                {
                    _repository.UpdateUser(new lab6.DbModels.Entities.UserTable
                    {
                        Name = loginModel.Name,
                        Email = loginModel.Email,
                        Password = loginModel.Password,
                        StayAnonim = loginModel.StayAnonim,
                        Level = loginModel.Level
                    });
                    return Ok(new ResponceMessage { Message = "Your info was successfully updated!", Status = true});
                }
            }

            return NotFound();
        }
        /// <summary>
        /// Play game
        /// </summary>
        /// <param ></param>
        /// <returns></returns>
        /// <response code="200">Returns success response</response>
         [ProducesResponseType(typeof(GameOponent), 200)]
        [Route("play")]
        [HttpPost]
        public async Task<IActionResult> Play()
        {
            if(_repository.GetUsers().Count > 2)
            {
                Random random = new Random();
                int i = random.Next(1, _repository.GetUsers().Count);
                return Ok(new GameOponent { Name = _repository.GetUsers()[i].Name, Gmail = _repository.GetUsers()[i].Email});
            }
            return NoContent();
        }
        /// <summary>
        /// Delete user
        /// </summary>
        /// <param ></param>
        /// <returns></returns>
        /// <response code="200">Returns success response</response>
        // [ProducesResponseType(typeof(CommonResponse<UserClientSideData>), 200)]
        [Route("delete")]
        [HttpDelete]
        public async Task<IActionResult> DeleteAccount(UserToDelete userToDelete)
        {
            foreach (var item in _repository.GetUsers())
            {
                if(item.Email == userToDelete.Email &&  item.Password == userToDelete.Password)
                {
                    _repository.DeleteUser(item);
                    return Ok(new ResponceMessage { Message = "User successfully deleted", Status = true });
                }
            }
            return NotFound();
        }
    }
}

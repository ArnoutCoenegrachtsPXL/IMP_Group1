namespace backend_NET.Models
{
    public class UserMockRepository : IUserRepository
    {
        private List<User> _users;
        public UserMockRepository() { 
            _users = new List<User>();
            User user = new User();
            user.UserId = new Guid();
            _users.Add(user);
        }
        public User GetUser(Guid userId)
        {
            return _users[0];
        }
    }
}

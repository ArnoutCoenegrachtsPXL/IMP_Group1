namespace backend_NET.Models
{
    public interface IUserRepository
    {
        User GetUser(Guid userId);
    }
}

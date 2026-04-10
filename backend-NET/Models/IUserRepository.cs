namespace backend_NET.Models
{
    public interface IUserRepository
    {
        User getUser(Guid userId);
    }
}

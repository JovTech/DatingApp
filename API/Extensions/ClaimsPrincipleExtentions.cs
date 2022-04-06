using System.Security.Claims;

namespace API.Extentions
{
    public static class ClaimsPrincipleExtentions
    {
        public static string GetUsername (this ClaimsPrincipal user)
        {
            return user.Findfirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
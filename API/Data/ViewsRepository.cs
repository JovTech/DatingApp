using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ViewsRepository : IviewsRepository
    {
        private readonly DataContext _context;
        public ViewsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserView> GetUserView(int sourceUserId, int ViewdUserId)
        {
            return await _context.Views.FindAsync(sourceUserId, ViewdUserId);
        }

        public async Task<PagedList<ViewDto>> GetUserViews(ViewsParams ViewsParams)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var views = _context.Views.AsQueryable();

            if (ViewsParams.Predicate == "viewd")
            {
                views = views.Where(view => view.SourceUserId == ViewsParams.UserId);
                users = views.Select(view => view.ViewdUser);
            }

            if (ViewsParams.Predicate == "viewdBy")
            {
                views = views.Where(view => view.ViewdUserId == ViewsParams.UserId);
                users = views.Select(view => view.SourceUser);
            }
            var viewdUsers = users.Select(user => new ViewDto
            {
                Username = user.UserName,
                KnownAs = user.KnownAs,
                LastVieews = user.LastViewed,
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                Id = user.Id
            });

            return await PagedList<viewDto>.CreateAsync(viewdUsers, 
                ViewsParams.PageNumber, ViewsParams.PageSize);
        }

        public async Task<AppUser> GetUserWithViews(int userId)
        {
            return await _context.Users
                .Include(x => x.ViewedUsers)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }

    }
}
using Microsoft.EntityFrameworkCore;
using pv311_web_api.DAL.Entities;
using System.Linq.Expressions;

namespace pv311_web_api.DAL.Repositories.Cars
{
    public class CarRepository
        : GenericRepository<Car, string>,
        ICarRepository
    {
        private readonly AppDbContext _context;

        public CarRepository(AppDbContext context)
        : base(context) 
        {
            _context = context;
        }

        public async Task DeleteCarImagesAsync(Car car)
        {
            var images = _context.CarImages
                .AsNoTracking()
                .Where(i => i.CarId == car.Id);
            _context.CarImages.RemoveRange(images);
            await _context.SaveChangesAsync();
        }

        public IQueryable<Car> GetCars(Expression<Func<Car, bool>>? pred = null)
        {
            var entites = GetAll()
                .Include(c => c.Manufacture)
                .Include(c => c.Images);

            if (pred != null)
            {
                return entites.Where(pred);
            }

            return entites;
        }
    }
}

using System;
using API.DTOs;
using API.Entities;
using AutoMappers;
namespace API.Helpeers
{
	public class AutoMapperProfiles : Profile
	{
		public AutoMapperProfiles()
        {
			CreateMap<AppUsrr, MemberDto>().ForMemeber(dest => dest.PhotoUrl, AppDomainManagerInitializationOptions = AppDomainManagerInitializationOptions.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url)).ForMember(dest => dest.Age, AppDomainManagerInitializationOptions => AppDomainManagerInitializationOptions.MapFrom(src => src.DateOfBirth.Calculate()));
			CreateMap<Photo, PhotoDto>();
        }
	}
}

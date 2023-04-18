using AutoMapper;
using backend.DataTypes;
using backend.Entities;

namespace backend.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Torneo, DTAddTorneo>().ReverseMap();
            CreateMap<Prediccion, DTAddPrediccion>().ReverseMap();
            CreateMap<EventoDeportivo,DTAddEventoDeportivo>().ReverseMap();
            CreateMap<EventoDeportivo, DTModScoreEvento>().ReverseMap();
            CreateMap<EventoDeportivo, DTShowEventoDeportivo>().ReverseMap();
            CreateMap<Usuario, DTAddUser>().ReverseMap();
            CreateMap<Usuario, DTShowUser>();
            CreateMap<Usuario, DTResponseFB>().ReverseMap();
            CreateMap<Usuario, DtShowUserPenca>().ReverseMap();
            CreateMap<Usuario,DTModUsuario>().ReverseMap();
            CreateMap<Foro, DTAddForo>().ReverseMap();
            CreateMap<Foro, DTAddForoComentario>().ReverseMap();
            CreateMap<Penca, DTModEmpresarial>().Include<Empresarial, DTModEmpresarial>().ReverseMap();
            CreateMap<Empresarial, DTModEmpresarial>().ReverseMap();
            CreateMap<DTShowUserEmpresa, DTShowUserEmpresa>();


        }
    }
}

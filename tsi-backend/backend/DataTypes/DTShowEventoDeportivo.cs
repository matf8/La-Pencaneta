using backend.Enum;

namespace backend.DataTypes
{
    public class DTShowEventoDeportivo
    {
        public int Id { get; set; }
        public int? LigaId { get; set; }
        public string? LigaNombre { get; set; }
        public string EquipoA { get; set; }
        public string EquipoB { get; set; }
        public int ScoreEquipoA { get; set; }
        public int ScoreEquipoB { get; set; }

        public bool TienePreddicion { get; set; } = false;
        public int? PrediccionA { get; set; }
        public int? PrediccionB { get; set; }


        public StatusEventoDeportivo StatusED { get; set; }
        public DateTime FechaEvento { get; set; }
        public string? EquipoALogo { get; set; }
        public string? EquipoBLogo { get; set; }
        public string? IdRemoto1 { get; set; }

    }
}

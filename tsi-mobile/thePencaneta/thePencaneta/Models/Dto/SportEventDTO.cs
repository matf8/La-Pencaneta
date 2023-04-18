using System;

namespace thePencaneta.Models.Dto {

    public class SportEventDTO { 

        public int Id { get; set; }
        public string TipoJuego { get; set; }
        public string EquipoA { get; set; }
        public string EquipoB { get; set; }
        public int? ScoreEquipoA { get; set; }
        public int? ScoreEquipoB { get; set; }
        public string LigaNombre { get; set; }
        public string LigaLogo { get; set; }
        public string LigaId { get; set; }
        public StatusEventoDeportivo StatusED { get; set; }
        public DateTime FechaEvento { get; set; }
        public string EquipoALogo { get; set; }
        public string EquipoBLogo { get; set; }
        public string IdRemoto1 { get; set; }
        public string IdRemoto2 { get; set; }
        public int TorneoId { get; set; }
                
        public SportEventDTO() { }

        public SportEventDTO(int id, string tipoJuego, string equipoA, string equipoB, int scoreEquipoA, int scoreEquipoB, string ligaNombre, string ligaLogo, string ligaId, StatusEventoDeportivo statusED, DateTime fechaEvento, string equipoALogo, string equipoBLogo, string idRemoto1, string idRemoto2, int torneoId) {
            Id = id;
            TipoJuego = tipoJuego;
            EquipoA = equipoA;
            EquipoB = equipoB;
            ScoreEquipoA = scoreEquipoA;
            ScoreEquipoB = scoreEquipoB;
            LigaNombre = ligaNombre;
            LigaLogo = ligaLogo;
            LigaId = ligaId;
            StatusED = statusED;
            FechaEvento = fechaEvento;
            EquipoALogo = equipoALogo;
            EquipoBLogo = equipoBLogo;
            IdRemoto1 = idRemoto1;
            IdRemoto2 = idRemoto2;
            TorneoId = torneoId;
        }
    }
}

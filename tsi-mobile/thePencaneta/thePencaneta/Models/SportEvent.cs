using System;

namespace thePencaneta.Models {

    public class SportEvent {

        public int Id { get; set; }
        public string LigaNombre { get; set; }

        public string EquipoA { get; set; }
        public string EquipoB { get; set; }
        public int ScoreEquipoA { get; set; }
        public int ScoreEquipoB { get; set; }

        public bool TienePreddicion { get; set; } = false;
        public int? PrediccionA { get; set; }
        public int? PrediccionB { get; set; }

        public StatusEventoDeportivo StatusED { get; set; }
        public DateTime FechaEvento { get; set; }
        public string EquipoALogo { get; set; }
        public string EquipoBLogo { get; set; }
        public string IdRemoto1 { get; set; }
        public int TorneoId { get; set; }

        public SportEvent() { }

        public SportEvent(int id, string ligaNombre, string equipoA, string equipoB, int scoreEquipoA, int scoreEquipoB, bool tienePreddicion, int? prediccionA, int? prediccionB, StatusEventoDeportivo statusED, DateTime fechaEvento, string equipoALogo, string equipoBLogo, string idRemoto1, int torneoId) {
            Id = id;
            LigaNombre = ligaNombre;
            EquipoA = equipoA;
            EquipoB = equipoB;
            ScoreEquipoA = scoreEquipoA;
            ScoreEquipoB = scoreEquipoB;
            TienePreddicion = tienePreddicion;
            PrediccionA = prediccionA;
            PrediccionB = prediccionB;
            StatusED = statusED;
            FechaEvento = fechaEvento;
            EquipoALogo = equipoALogo;
            EquipoBLogo = equipoBLogo;
            IdRemoto1 = idRemoto1;
            TorneoId = torneoId;
        }       
    }
}

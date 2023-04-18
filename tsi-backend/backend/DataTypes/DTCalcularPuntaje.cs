using backend.Entities;

namespace backend.DataTypes
{
    public class DTCalcularPuntaje
    {
        public int? EquipoA { get; set; }
        public int? EquipoB { get; set; }

        public int PrediccionA { get; set; }
        public int PrediccionB { get; set; }

        public DTCalcularPuntaje(int? equipoA, int? equipoB, int prediccionA, int prediccionB)
        {
            EquipoA = equipoA;
            EquipoB = equipoB;
            PrediccionA = prediccionA;
            PrediccionB = prediccionB;
        }
    }

    public static class CalcularPuntaje
    {
        public static int Calcular(this DTCalcularPuntaje dt)
        {
            if (dt.EquipoA == null) return 0;
            if (dt.EquipoB == null) return 0;

            if ((dt.EquipoA == dt.PrediccionA) && (dt.EquipoB == dt.PrediccionB)) return 8;
            if ((dt.EquipoA == dt.EquipoB) && (dt.PrediccionA == dt.PrediccionB)) return 3;

            var difHome = dt.EquipoA - dt.EquipoB;
            var difVisit = dt.PrediccionA - dt.PrediccionB;

            if (difHome == difVisit) return 5;

            if ((difHome > 0) && (difVisit > 0)) return 3;

            if ((difHome < 0) && (difVisit < 0)) return 3;

            return 0;
        }

    }
}

using System.ComponentModel;

namespace thePencaneta {

    public class RankingViewModel {

        public string Posicion { get; set; }
        public string Puntos { get; set; }
        public string Participante { get; set; }

        public RankingViewModel() { }

        public RankingViewModel(string Posicion, string Puntos, string Participante) {
            this.Posicion = Posicion;
            this.Puntos = Puntos;
            this.Participante = Participante;
        }

    }
}

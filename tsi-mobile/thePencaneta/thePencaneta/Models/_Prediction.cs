namespace thePencaneta {

    public class _Prediction {

        public int Id { get; set; }
        public int ScoreEquipoA { get; set; }
        public int ScoreEquipoB { get; set; }
        public int UsuarioId { get; set; } 
        public int EventoDeportivoId { get; set; }
        public int PencaId { get; set; }     
        public int Puntaje { get; set; }
       
        public _Prediction() { }

        public _Prediction(int id, int scoreEquipoA, int scoreEquipoB, int usuarioId, int eventoDeportivoId, int pencaId, int puntaje) {
            Id = id;
            ScoreEquipoA = scoreEquipoA;
            ScoreEquipoB = scoreEquipoB;
            UsuarioId = usuarioId;
            EventoDeportivoId = eventoDeportivoId;
            PencaId = pencaId;
            Puntaje = puntaje;
        }
    }
}


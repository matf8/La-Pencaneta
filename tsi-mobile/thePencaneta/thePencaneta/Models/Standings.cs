namespace thePencaneta.Models {

    public class Standings {

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public int Puntaje { get; set; } = 0;
        public int Ranking { get; set; } = 0;

        public Standings() { }
    }
}

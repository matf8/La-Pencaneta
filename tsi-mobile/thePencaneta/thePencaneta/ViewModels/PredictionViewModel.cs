using Plugin.ValidationRules;
using thePencaneta.Validations;

namespace thePencaneta.ViewModels {

    public class PredictionViewModel {
                      
        public Validatable<string> ScoreA { get; set; }
        public Validatable<string> ScoreB { get; set; }
        private ValidationUnit _unit3;

        public PredictionViewModel() {
            ScoreA = new Validatable<string>();
            ScoreB = new Validatable<string>();
            _unit3 = new ValidationUnit(ScoreA, ScoreB);
            AddValidations();
        }

        private void AddValidations() {
            // Score validations
            ScoreA.Validations.Add(new PredictionRule());
            ScoreB.Validations.Add(new PredictionRule());
        }

        public bool Validate() {           
            return _unit3.Validate();
        }

    }
}

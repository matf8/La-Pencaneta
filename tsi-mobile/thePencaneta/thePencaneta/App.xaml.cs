using thePencaneta.Views;
using System.Diagnostics;
using Xamarin.Forms;

[assembly: ExportFont("MavenPro.ttf", Alias = "Maven")]
namespace thePencaneta {

    public partial class App : Application {

        public App() {
            InitializeComponent();
            MainPage = new NavigationPage(new Router());
        }

        protected override void OnStart() {
            Debug.WriteLine("\n###########\nEMPEZANDO APP \n###########\n\tLA PENCANETA \n###########\n ");
        }

        protected override void OnSleep() {
        }

        protected override void OnResume() {
        }
    }
}

using System;
using Xamarin.Forms;

namespace thePencaneta { 

    public partial class Menu : FlyoutPage {

        public Menu() {
            InitializeComponent();
            flyout.lvDash.ItemSelected += OnSelectedItem;
        }

        private void OnSelectedItem(object sender, SelectedItemChangedEventArgs e) {
            var item = e.SelectedItem as MenuViewModel;
            if (item != null) {
                Detail = new NavigationPage((Page)Activator.CreateInstance(item.TargetPage));
                flyout.lvDash.SelectedItem = null;
                IsPresented = false;
            }
        }

        protected override bool OnBackButtonPressed() {
            return true;
        }
    }
}
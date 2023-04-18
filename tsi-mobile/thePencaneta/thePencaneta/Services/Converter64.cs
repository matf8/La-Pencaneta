using System.Globalization;
using System;
using Xamarin.Forms;
using System.IO;

namespace thePencaneta { 

    public class Converter64 : IValueConverter {

        public Converter64() { }

        public object Convert(object value, Type targetType, object parameter, CultureInfo culture) {
            string base64Image = (string) value;

            if (base64Image == null)
                return null;
            else if (IsBase64String(base64Image)) {

                // Convert base64Image from string to byte-array
                var imageBytes = System.Convert.FromBase64String(base64Image);

                // Return a new ImageSource
                return ImageSource.FromStream(() => { return new MemoryStream(imageBytes); });
            } else return value;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture) {
            // Not implemented as we do not convert back
            throw new NotSupportedException();
        }

        public static bool IsBase64String(string base64) {
            Span<byte> buffer = new Span<byte>(new byte[base64.Length]);
            return System.Convert.TryFromBase64String(base64, buffer, out int bytesParsed);
        }

    }
}
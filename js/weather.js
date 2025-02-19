const apiKey = "3804cadfab0faa96bede8c931267927d"; // Ganti dengan API Key OpenWeatherMap

// Fungsi untuk mengambil data cuaca berdasarkan lokasi (latitude dan longitude)
function fetchWeather(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=id`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                document.getElementById("weatherAlert").innerText = "⚠️ Lokasi tidak ditemukan!";
                return;
            }

            const city = data.name;
            const temp = Math.round(data.main.temp);
            const condition = data.weather[0].description;
            const wind = data.wind.speed;
            const humidity = data.main.humidity;

            let alertMessage = `🌍 ${city} | Suhu: ${temp}°C | Kondisi: ${condition} | Angin: ${wind} km/h | Kelembapan: ${humidity}%`;

            if (temp > 33) {
                alertMessage += " ⚠️ Peringatan: Cuaca sangat panas! Tetap terhidrasi.";
            } else if (temp < 10) {
                alertMessage += " ❄️ Peringatan: Cuaca sangat dingin! Gunakan pakaian hangat.";
            }

            if (wind > 50) {
                alertMessage += " 🌪️ Peringatan: Angin kencang! Hati-hati saat bepergian.";
            }

            document.getElementById("weatherAlert").innerText = alertMessage;
        })
        .catch(error => {
            document.getElementById("weatherAlert").innerText = "⚠️ Gagal mengambil data cuaca.";
        });
}

// Mendapatkan lokasi pengguna secara otomatis menggunakan Geolocation API
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Panggil fungsi fetchWeather dengan koordinat lokasi pengguna
        fetchWeather(latitude, longitude);
    }, function(error) {
        document.getElementById("weatherAlert").innerText = "⚠️ Gagal mendapatkan lokasi!";
    });
} else {
    document.getElementById("weatherAlert").innerText = "⚠️ Geolocation tidak didukung oleh browser ini.";
}

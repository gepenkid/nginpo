        const apiKey = "3804cadfab0faa96bede8c931267927d"; // Ganti dengan API Key OpenWeatherMap

        // Gunakan variabel desa/kecamatan otomatis yang Anda miliki
        const lokasiku = "{lokasi_kecamatan}";

        function fetchWeather(location) {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location},ID&appid=${apiKey}&units=metric&lang=id`;

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

        // Panggil fungsi saat halaman dimuat
        fetchWeather(lokasi);

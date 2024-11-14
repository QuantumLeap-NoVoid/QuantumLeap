// Elemen-elemen yang digunakan untuk efek scroll
let stars = document.getElementById('stars');
let moon = document.getElementById('moon');
let mountains_behind = document.getElementById('mountains_behind');
let mountains_front = document.getElementById('mountains_front');
let text = document.getElementById('text');
let btn = document.getElementById('btn');

// Efek scroll pada elemen gambar dan teks
window.addEventListener('scroll', function() {
    let value = window.scrollY;
        stars.style.left = value * 1.25 + 'px';
            moon.style.top = value * 1.5 + 'px';
                mountains_behind.style.top = value * 0.5 + 'px';
                    mountains_front.style.top = value * 0 + 'px';
                        text.style.marginRight = value * 4 + 'px';
                            text.style.marginTop = value * 1.5 + 'px';
                                btn.style.marginTop = value * 1.5 + 'px';
                                });

                                function loadTugasTerbaru() {
                                    return new Promise((resolve, reject) => {
                                            const xhr = new XMLHttpRequest();
                                                    // Endpoint untuk mengambil semua dokumen dari koleksi 'tugas'
                                                            xhr.open('GET', 'https://firestore.googleapis.com/v1/projects/tugas-c05d3/databases/(default)/documents/tugas');
                                                                    
                                                                            xhr.onload = function() {
                                                                                        if (xhr.status === 200) {
                                                                                                        const data = JSON.parse(xhr.responseText);
                                                                                                                        
                                                                                                                                        // Cek struktur data untuk melihat updateTime di setiap dokumen
                                                                                                                                                        console.log("Data Tugas Sebelum Disortir:", data);

                                                                                                                                                                        // Sortir berdasarkan `updateTime` secara descending dan ambil dokumen terbaru
                                                                                                                                                                                        const sortedDocuments = data.documents.sort((a, b) =>
                                                                                                                                                                                                            new Date(b.updateTime) - new Date(a.updateTime)
                                                                                                                                                                                                                            );

                                                                                                                                                                                                                                            // Log dokumen yang disortir untuk verifikasi
                                                                                                                                                                                                                                                            console.log("Data Tugas Setelah Disortir:", sortedDocuments);

                                                                                                                                                                                                                                                                            // Ambil hanya dokumen terbaru (paling pertama setelah disortir)
                                                                                                                                                                                                                                                                                            const latestDocument = sortedDocuments[0] ? [sortedDocuments[0]] : [];

                                                                                                                                                                                                                                                                                                            displayTugas({ documents: latestDocument }); // Tampilkan dokumen terbaru saja
                                                                                                                                                                                                                                                                                                                            resolve(data);
                                                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                                                        reject(new Error('Gagal memuat data tugas'));
                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                            };

                                                                                                                                                                                                                                                                                                                                                                                    xhr.onerror = reject;
                                                                                                                                                                                                                                                                                                                                                                                            xhr.send();
                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                // Fungsi menampilkan data dari tugas ke Frontend melalui DOM
                                                                                                                                                                                                                                                                                                                                                                                                function displayTugas(data) {
                                                                                                                                                                                                                                                                                                                                                                                                    const tugasElement = document.querySelector('#tugas + .andromeda');
                                                                                                                                                                                                                                                                                                                                                                                                        tugasElement.innerHTML = ''; // Kosongkan konten sebelumnya

                                                                                                                                                                                                                                                                                                                                                                                                            if (!data.documents || data.documents.length === 0) {
                                                                                                                                                                                                                                                                                                                                                                                                                    tugasElement.textContent = 'Tidak ada tugas terbaru untuk ditampilkan.';
                                                                                                                                                                                                                                                                                                                                                                                                                            return;
                                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                                    data.documents.forEach(doc => {
                                                                                                                                                                                                                                                                                                                                                                                                                                            if (doc.fields && doc.fields.tanggal && doc.fields.tanggal.stringValue) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                        const tanggalElement = document.createElement('p');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    tanggalElement.innerHTML = `<strong>${doc.fields.tanggal.stringValue}</strong>`;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                tugasElement.appendChild(tanggalElement);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if (doc.fields && doc.fields.detail && doc.fields.detail.stringValue) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            const tugasJSON = doc.fields.detail.stringValue;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        const tugasList = JSON.parse(tugasJSON);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        tugasList.forEach(item => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            const p = document.createElement('p');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                p.textContent = `• ${item.mapel}: ${item.tugas}`;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    tugasElement.appendChild(p);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                } catch (error) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                console.error('Gagal memproses tugas JSON:', error);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        // Panggil fungsi untuk mengambil data tugas terbaru
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        loadTugasTerbaru();
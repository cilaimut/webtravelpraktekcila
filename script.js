/**
 * Data Awal Paket Wisata (Array of Objects)
 * Minimal 4 item sesuai requirement
 */
let packagesData = [
    {
        id: 1,
        name: "Kyoto Serenity",
        desc: "Nikmati ketenangan musim semi dengan bunga sakura bermekaran di kuil-kuil indah Kyoto.",
        price: "Rp 15.000.000",
        img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Parisian Romance",
        desc: "Jelajahi keindahan kota cinta dengan makan malam romantis berlatar Menara Eiffel.",
        price: "Rp 22.000.000",
        img: "https://images.unsplash.com/photo-1502602898657-3e9076113821?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Santorini Breeze",
        desc: "Rasakan angin laut mediterania dengan bangunan putih biru klasik dan matahari terbenam memukau.",
        price: "Rp 18.500.000",
        img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Jeju Healing",
        desc: "Perjalanan penyembuhan jiwa di pulau vulkanik yang asri dengan pemandangan alam mempesona.",
        price: "Rp 10.000.000",
        img: "https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?auto=format&fit=crop&w=800&q=80"
    }
];

// --- 1. FITUR DINAMIS: RENDER PAKET WISATA ---

const packageContainer = document.getElementById('package-list');
const packageSelect = document.getElementById('package-select');

// Fungsi utama untuk me-render card dan opsi select
function renderPackages() {
    // Kosongkan kontainer sebelum me-render ulang
    packageContainer.innerHTML = '';
    packageSelect.innerHTML = '<option value="">-- Pilih Destinasi --</option>';

    packagesData.forEach(pkg => {
        // Render Card Paket List
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-img" style="background-image: url('${pkg.img}')"></div>
            <div class="card-content">
                <h3 class="card-title">${pkg.name}</h3>
                <p class="card-desc">${pkg.desc}</p>
                <p class="card-price">${pkg.price}</p>
                <button class="btn-delete" onclick="deletePackage(${pkg.id})">Hapus Paket</button>
            </div>
        `;
        packageContainer.appendChild(card);

        // Render Opsi pada Select Element di Form Pemesanan
        const option = document.createElement('option');
        option.value = pkg.name;
        option.textContent = pkg.name;
        packageSelect.appendChild(option);
    });
}

// Inisialisasi awal render
renderPackages();


// --- 2. FITUR DINAMIS: TAMBAH & HAPUS PAKET ---

// Hapus Paket berdasarkan ID
function deletePackage(id) {
    if(confirm("Apakah Anda yakin ingin menghapus paket wisata ini?")){
        packagesData = packagesData.filter(pkg => pkg.id !== id);
        renderPackages(); // Render ulang setelah dihapus
    }
}

// Tambah Paket Baru
const addForm = document.getElementById('add-package-form');
addForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const newName = document.getElementById('new-name').value;
    const newDesc = document.getElementById('new-desc').value;
    const newPrice = document.getElementById('new-price').value;
    let newImg = document.getElementById('new-img').value;

    // Gambar default jika kosong
    if(!newImg) {
        newImg = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80";
    }

    const newPackage = {
        id: Date.now(), // Generate ID sederhana dari timestamp
        name: newName,
        desc: newDesc,
        price: newPrice,
        img: newImg
    };

    packagesData.push(newPackage);
    renderPackages(); // Render ulang dengan data baru
    
    // Reset form admin
    addForm.reset();
});


// --- 3. FITUR: VALIDASI FORM PEMESANAN ---

const bookingForm = document.getElementById('booking-form');

// Fungsi pembantu untuk set error
function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-msg');
    
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
}

// Fungsi pembantu untuk set valid (hilangkan error)
function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-msg');
    
    if(errorDisplay){
        errorDisplay.innerText = '';
    }
    inputControl.classList.remove('error');
}

// Handler Submit Form
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah reload halaman

    let isValid = true; // Flag validasi

    // Ambil elemen input
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');
    const phoneInput = document.getElementById('phone');
    const packageInput = document.getElementById('package-select');
    
    // Validasi Nama Lengkap (Wajib diisi)
    if(nameInput.value.trim() === '') {
        setError(nameInput, 'Nama lengkap wajib diisi');
        isValid = false;
    } else {
        setSuccess(nameInput);
    }

    // Validasi Email (Wajib diisi dan format valid)
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailValue === '') {
        setError(emailInput, 'Email wajib diisi');
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        setError(emailInput, 'Format email tidak valid');
        isValid = false;
    } else {
        setSuccess(emailInput);
    }

    // Validasi Umur (Minimal 18 tahun)
    const ageValue = parseInt(ageInput.value);
    if(ageInput.value.trim() === '') {
        setError(ageInput, 'Umur wajib diisi');
        isValid = false;
    } else if (isNaN(ageValue) || ageValue < 18) {
        setError(ageInput, 'Umur harus minimal 18 tahun');
        isValid = false;
    } else {
        setSuccess(ageInput);
    }

    // Validasi Nomor Telepon (Wajib diisi, harus berupa angka positif)
    const phoneValue = phoneInput.value.trim();
    if(phoneValue === '') {
        setError(phoneInput, 'Nomor telepon wajib diisi');
        isValid = false;
    } else if (Number(phoneValue) <= 0 || isNaN(Number(phoneValue))) {
        setError(phoneInput, 'Nomor telepon harus valid');
        isValid = false;
    } else {
        setSuccess(phoneInput);
    }

    // Validasi Pilihan Paket Wisata (Wajib dipilih)
    if(packageInput.value === '') {
        setError(packageInput, 'Silakan pilih destinasi wisata');
        isValid = false;
    } else {
        setSuccess(packageInput);
    }

    // Validasi Pilihan Radio (Kelas Penerbangan wajib dipilih)
    const flightRadios = document.querySelectorAll('input[name="flight"]');
    const flightError = document.getElementById('flight-error');
    let isFlightSelected = false;
    flightRadios.forEach(radio => {
        if(radio.checked) isFlightSelected = true;
    });

    if(!isFlightSelected) {
        flightError.innerText = 'Pilih kelas penerbangan';
        flightError.style.display = 'block';
        isValid = false;
    } else {
        flightError.innerText = '';
        flightError.style.display = 'none';
    }

    // Jika semua validasi lolos
    if(isValid) {
        // Tampilkan pesan sukses manipulasi DOM
        const successMessage = document.getElementById('success-message');
        successMessage.innerText = 'Pemesanan berhasil! Staf kami akan segera menghubungi Anda.';
        
        // Reset isi form
        bookingForm.reset();
        
        // Hilangkan pesan sukses setelah 5 detik
        setTimeout(() => {
            successMessage.innerText = '';
        }, 5000);
    }
});

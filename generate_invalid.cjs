const fs = require('fs');
const data = JSON.parse(fs.readFileSync('alumni_list.json'));

const invalidData = data.map((item, index) => {
  return {
    id: index + 1,
    nama: item['Nama Lulusan'],
    nim: item['NIM'],
    tahunMasuk: "-",
    tanggalLulus: "-",
    prodi: item['Program Studi'],
    status: "Belum Valid",
    alamatBekerja: "-",
    posisiJabatan: "-",
    statusPekerjaan: "-"
  };
});

fs.writeFileSync('src/data/invalidData.json', JSON.stringify(invalidData, null, 2));
console.log('Generated invalidData.json successfully');

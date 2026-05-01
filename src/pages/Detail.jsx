import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState(null);

  useEffect(() => {
    // Fungsi untuk mencari data alumni berdasarkan ID
    const findAlumni = async () => {
      // Cari di data lokal

      try {
        let found = null;
        const resValid = await fetch('/data/validData.json');
        const validDataJson = await resValid.json();
        found = validDataJson.find(item => item.id.toString() === id);

        if (!found) {
          const resInvalid = await fetch('/data/invalidData.json');
          const invalidDataJson = await resInvalid.json();
          found = invalidDataJson.find(item => item.id.toString() === id);
        }

        if (found) {
          setAlumni(found);
        }
      } catch (e) {
        console.error("Error fetching local data", e);
      }
    };

    findAlumni();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  if (!alumni) {
    return (
      <div className="app-container">
        <div className="detail-page">
          <p>Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="detail-page">
        
        <div className="detail-header">
          <button className="btn-back" onClick={handleBack}>&larr; Kembali</button>
          <h1 className="detail-title">Detail Alumni</h1>
        </div>

        <div className="detail-card">
          <div className="detail-profile">
            <h2 className="profile-name">{alumni.nama || '-'}</h2>
            <div className="profile-nim">NIM: {alumni.nim || '-'} • Prodi: {alumni.prodi || '-'}</div>
          </div>

          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">LINKEDIN</div>
              <div className="detail-value">
                {alumni.linkedin && alumni.linkedin !== '-' ? (
                  <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer" className="detail-link">
                    {alumni.linkedin}
                  </a>
                ) : (
                  '-'
                )}
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-label">INSTAGRAM</div>
              <div className="detail-value">{alumni.instagram || '-'}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">EMAIL</div>
              <div className="detail-value">{alumni.email || '-'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">NOMOR HP</div>
              <div className="detail-value">{alumni.nomorHp || '-'}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">TIKTOK</div>
              <div className="detail-value">{alumni.tiktok || '-'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">FACEBOOK</div>
              <div className="detail-value">{alumni.facebook || '-'}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">ALAMAT BEKERJA</div>
              <div className="detail-value">{alumni.alamatBekerja || '-'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">TEMPAT BEKERJA</div>
              <div className="detail-value">{alumni.tempatBekerja || '-'}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">POSISI JABATAN</div>
              <div className="detail-value">{alumni.posisiJabatan || '-'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">STATUS PEKERJAAN</div>
              <div className="detail-value">{alumni.statusPekerjaan || '-'}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">SOSIAL MEDIA KANTOR</div>
              <div className="detail-value">
                {alumni.sosialMediaKantor && alumni.sosialMediaKantor !== '-' ? (
                  <a href={alumni.sosialMediaKantor} target="_blank" rel="noopener noreferrer" className="detail-link">
                    {alumni.sosialMediaKantor}
                  </a>
                ) : (
                  '-'
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Detail;

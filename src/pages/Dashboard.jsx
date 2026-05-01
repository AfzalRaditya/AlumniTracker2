import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CheckCircle, Search, Database } from 'lucide-react';


function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('valid'); // 'valid' atau 'invalid'
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState(null); // 'asc' atau 'desc' atau null

  useEffect(() => {
    async function fetchData() {
      if (activeTab === 'valid') {
        try {
          const res = await fetch('/data/validData.json');
          const validDataJson = await res.json();
          setData(validDataJson);
        } catch (error) {
          console.error('Error fetching valid data:', error);
        }
      } else {
        try {
          const res = await fetch('/data/invalidData.json');
          const invalidDataJson = await res.json();
          setData(invalidDataJson);
        } catch (error) {
          console.error('Error fetching invalid data:', error);
        }
      }
    }
    
    fetchData();
  }, [activeTab]);

  const filteredData = React.useMemo(() => {
    let result = [...data];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => {
        return (
          (item.nama && item.nama.toLowerCase().includes(q)) ||
          (item.nim && String(item.nim).toLowerCase().includes(q)) ||
          (item.prodi && item.prodi.toLowerCase().includes(q)) ||
          (item.status && item.status.toLowerCase().includes(q)) ||
          (item.tahunMasuk && String(item.tahunMasuk).toLowerCase().includes(q))
        );
      });
    }

    // Sort by tahunMasuk
    if (sortOrder) {
      result.sort((a, b) => {
        const yearA = parseInt(a.tahunMasuk) || 0;
        const yearB = parseInt(b.tahunMasuk) || 0;
        
        if (sortOrder === 'asc') {
          return yearA - yearB;
        } else {
          return yearB - yearA;
        }
      });
    } else {
      // Acak data dengan memastikan tahunMasuk beragam
      const groupedByYear = {};
      for (let i = 0; i < result.length; i++) {
        const item = result[i];
        const year = item.tahunMasuk || 'Unknown';
        if (!groupedByYear[year]) {
          groupedByYear[year] = [];
        }
        groupedByYear[year].push(item);
      }

      const diverseResult = [];
      const years = Object.keys(groupedByYear);
      
      // Acak urutan tahun
      years.sort(() => Math.random() - 0.5);

      let hasMore = true;
      while (hasMore) {
        hasMore = false;
        for (const year of years) {
          const group = groupedByYear[year];
          if (group.length > 0) {
            // Ambil elemen acak dari grup menggunakan teknik swap dengan elemen terakhir
            const randomIndex = Math.floor(Math.random() * group.length);
            const lastIndex = group.length - 1;
            
            const temp = group[randomIndex];
            group[randomIndex] = group[lastIndex];
            group[lastIndex] = temp;
            
            diverseResult.push(group.pop());
            hasMore = true;
          }
        }
      }
      result = diverseResult;
    }

    return result;
  }, [data, searchQuery, sortOrder]);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="app-container">
      <div className="dashboard-layout">
        
        {/* Header Section */}
        <header className="dashboard-header">
          <div className="header-title-container">
            <span className="header-subtitle">Pemeta alumni kampus UMM</span>
            <h1 className="header-title">Alumni Tracker</h1>
          </div>
          <button className="btn-logout" onClick={handleLogout}>Keluar</button>
        </header>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <div className="card-header">
              <Users size={16} className="card-icon blue" />
              TOTAL ALUMNI
            </div>
            <div className="card-value">142.293</div>
            <div className="card-desc">Seluruh database alumni</div>
          </div>

          <div className="summary-card">
            <div className="card-header">
              <Search size={16} className="card-icon blue" />
              BELUM TERLACAK
            </div>
            <div className="card-value">140.697</div>
            <div className="card-desc">Perlu pengecekan</div>
          </div>
          <div className="summary-card">
            <div className="card-header">
              <Database size={16} className="card-icon gray" />
              SUDAH VALIDASI
            </div>
            <div className="card-value">1.596</div>
            <div className="card-desc">Sudah masuk database</div>
          </div>
        </div>

        {/* Main Content (Table Area) */}
        <main className="main-content">
          <div className="content-header">
            <div>
              <div className="section-subtitle">Data Alumni</div>
              <h2 className="section-title">Pencarian & Manajemen</h2>
            </div>
            <div className="content-actions">
              <button 
                className={`btn-toggle ${activeTab === 'valid' ? 'active valid' : ''}`}
                onClick={() => setActiveTab('valid')}
              >
                TERVERIFIKASI
              </button>
              <button 
                className={`btn-toggle ${activeTab === 'invalid' ? 'active invalid' : ''}`}
                onClick={() => setActiveTab('invalid')}
              >
                TIDAK VALID
              </button>
            </div>
          </div>

          <div className="filters-container">
            <input 
              type="text" 
              placeholder="Cari nama, NIM, prodi, status..." 
              className="filter-input filter-search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className="btn-filter"
              onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
            >
              {sortOrder === 'asc' ? 'Urut Tahun: Tertua' : sortOrder === 'desc' ? 'Urut Tahun: Termuda' : 'Urutkan Tahun'}
            </button>
            {sortOrder && (
              <button 
                className="btn-filter"
                onClick={() => setSortOrder(null)}
                style={{ background: 'transparent', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#f87171' }}
              >
                Reset Urutan
              </button>
            )}
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>NAMA LULUSAN</th>
                  <th>NIM</th>
                  <th>TAHUN MASUK</th>
                  <th>TANGGAL LULUS</th>
                  <th>PROGRAM STUDI</th>
                  <th>STATUS PENCARIAN</th>
                  <th>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, 100).map((item) => (
                  <tr key={item.id}>
                    <td>{item.nama || '-'}</td>
                    <td>{item.nim || '-'}</td>
                    <td>{item.tahunMasuk || '-'}</td>
                    <td>{item.tanggalLulus || '-'}</td>
                    <td>{item.prodi || '-'}</td>
                    <td>{item.status || '-'}</td>
                    <td>
                      <button className="btn-detail" onClick={() => navigate(`/detail/${item.id}`)}>Detail</button>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center' }}>Tidak ada data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;

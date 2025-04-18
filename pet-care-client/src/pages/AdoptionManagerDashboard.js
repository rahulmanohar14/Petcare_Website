import React from 'react';

function AdoptionManagerDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div style={{ padding: '30px' }}>
      <h1>Welcome, {user?.email}</h1>
      <h2>Adoption Manager Dashboard</h2>
      <p>
        Here you can manage pet adoption requests, update available pets, and
        communicate with potential adopters.
      </p>

      {/* You can later add tables, forms, etc. */}
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Adoption Tasks (To Be Added):</h3>
        <ul>
          <li>✅ View adoption requests</li>
          <li>✅ Approve or reject applications</li>
          <li>✅ Update pet availability</li>
          <li>✅ Contact potential adopters</li>
        </ul>
      </div>
    </div>
  );
}

export default AdoptionManagerDashboard;
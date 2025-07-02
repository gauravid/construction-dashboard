import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaBell, FaMapMarkerAlt, FaTools, FaCalendarAlt } from 'react-icons/fa';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tools')
      .then(res => setTools(res.data))
      .catch(err => console.error(err));
  }, []);

  const overdueTools = tools.filter(tool => {
    const daysSince = moment().diff(moment(tool.lastServiced), 'days');
    return tool.usageHours >= 50 || daysSince >= 30;
  });

  const upcomingService = tools.filter(tool => {
    const daysSince = moment().diff(moment(tool.lastServiced), 'days');
    return daysSince >= 25 && daysSince < 30;
  });

  const recentTools = [...tools].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);

  const locationSummary = tools.reduce((summary, tool) => {
    summary[tool.location] = (summary[tool.location] || 0) + 1;
    return summary;
  }, {});

  const statusCounts = {
    Available: 0,
    Service: 0,
    Damage: 0
  };

  tools.forEach(tool => {
    if (tool.status === 'Available') statusCounts.Available++;
    else if (tool.status === 'In Use') statusCounts.Service++;
    else if (tool.status === 'Damaged') statusCounts.Damage++;
  });

  const statusChartData = {
    labels: ['Available', 'Service', 'Damage'],
    datasets: [{
      data: [statusCounts.Available, statusCounts.Service, statusCounts.Damage],
      backgroundColor: ['#00C853', '#FFD700', '#D32F2F']
    }]
  };

  const servicedPerMonth = tools.reduce((acc, tool) => {
    const month = moment(tool.lastServiced).format('MMMM');
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const monthChartData = {
    labels: Object.keys(servicedPerMonth),
    datasets: [{
      label: 'Serviced Tools',
      data: Object.values(servicedPerMonth),
      backgroundColor: '#FFD700'
    }]
  };

  return (
    <div style={{ background: '#000', padding: '30px', minHeight: '100vh' }}>
      <h2 style={{ fontWeight: '600', marginBottom: '25px', color: '#f1c40f' }}>
            🛠 Construction Dashboard
          </h2>

      <div className="row g-4">
        {/* ALERT BOX */}
        <div className="col-md-3">
          <div className="card p-3 shadow-sm border-0 h-100" style={{ minHeight: '200px' }}>
            <h4 className="fw-bold"><FaBell className="me-2" style={{ color: '#f1c40f', fontSize: '1.3rem' }}/>Alerts</h4>
            <p className="mb-1">{overdueTools.length} tools require service</p>
            <ul style={{ paddingLeft: '20px', marginBottom: 0 }}>
              {overdueTools.slice(0, 2).map(tool => (
                <li key={tool._id}>{tool.name} (overdue)</li>
              ))}
            </ul>
          </div>
        </div>

        {/* UPCOMING SERVICE */}
        <div className="col-md-3">
          <div className="card p-3 shadow-sm border-0 h-100" style={{ minHeight: '200px' }}>
            <h4 className="fw-bold"><FaCalendarAlt className="me-2" style={{ color: '#f1c40f', fontSize: '1.3rem' }}/>Upcoming Service</h4>
            <ul style={{ paddingLeft: '20px', marginBottom: 0 }}>
              {upcomingService.length ? upcomingService.map(t => (
                <li key={t._id}>{t.name} - {moment(t.lastServiced).fromNow()}</li>
              )) : <li>No upcoming</li>}
            </ul>
          </div>
        </div>

        {/* RECENT TOOLS */}
        <div className="col-md-3">
          <div className="card p-3 shadow-sm border-0 h-100" style={{ minHeight: '200px' }}>
            <h4 className="fw-bold"><FaTools className="me-2" style={{ color: '#f1c40f', fontSize: '1.3rem' }}/>Recent Additions</h4>
            <ul style={{ paddingLeft: '20px', marginBottom: 0 }}>
              {recentTools.map(tool => <li key={tool._id}>{tool.name}</li>)}
            </ul>
          </div>
        </div>

        {/* LOCATION SUMMARY */}
        <div className="col-md-3">
          <div className="card p-3 shadow-sm border-0 h-100" style={{ minHeight: '200px' }}>
            <h4 className="fw-bold"><FaMapMarkerAlt className="me-2" style={{ color: '#f1c40f', fontSize: '1.3rem' }}/>Location Summary</h4>
            <ul style={{ paddingLeft: '20px', marginBottom: 0 }}>
              {Object.entries(locationSummary).map(([loc, count]) => (
                <li key={loc}>{loc}: {count}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* CHARTS ROW */}
<div className="row g-4 justify-content-center">
  {/* TOOL STATUS DOUGHNUT CHART */}
  <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
  <div className="card p-2 shadow-sm rounded-3 border-0 w-100" style={{ height: '400px' }}>
    <h6 className="fw-bold text-center mb-2" style={{ fontSize: '1.5rem' }}>🔧 Tool Status</h6>
    <div style={{ height: '340px' }}>
      <Doughnut data={statusChartData} options={{ maintainAspectRatio: false }} />
    </div>
  </div>
</div>


  {/* SERVICED PER MONTH BAR CHART */}
  <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
  <div className="card p-2 shadow-sm rounded-3 border-0 w-100" style={{ height: '400px' }}>
    <h6 className="fw-bold text-center mb-2" style={{ fontSize: '1.5rem' }}>📈 Serviced per Month</h6>
    <div style={{ height: '340px' }}>
      <Bar
        data={monthChartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { display: false } },
            x: { grid: { display: false } }
          }
        }}
      />
    </div>
  </div>
</div>

</div>


      </div>
    </div>
  );
};

export default Dashboard;

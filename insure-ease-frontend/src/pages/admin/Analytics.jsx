import { useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

const Analytics = () => {
 
  const analytics = useSelector((state) => state.admin.analytics);

  if (!analytics) {
    return <div className="text-center mt-4"><strong>Loading analytics...</strong></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Admin Analytics</h2>

      {/* Summary Cards */}
      <div className="row mt-3">
        <div className="col-md-3">
          <div className="card shadow p-3 text-center bg-primary text-white">
            <h4>{analytics.totalPolicies}</h4>
            <p>Total Policies Sold</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow p-3 text-center bg-danger text-white">
            <h4>{analytics.totalClaims}</h4>
            <p>Total Claims Processed</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow p-3 text-center bg-success text-white">
            <h4>${analytics.totalRevenue.toLocaleString()}</h4>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow p-3 text-center bg-warning text-dark">
            <h4>{analytics.activeUsers}</h4>
            <p>Active Users</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h5 className="text-center">Policies Sold (Last 6 Months)</h5>
            <Bar 
              data={{
                labels: analytics.policyTrends.labels,
                datasets: [
                  {
                    label: "Policies Sold",
                    data: analytics.policyTrends.data,
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h5 className="text-center">Claims by Type</h5>
            <Pie 
              data={{
                labels: analytics.claimsByType.labels,
                datasets: [
                  {
                    data: analytics.claimsByType.data,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
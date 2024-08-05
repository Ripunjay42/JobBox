// components/Dashboard.js
const Dashboard = ({ user, onLogout }) => {
    return (
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
        <div className="flex items-center space-x-4">
          <div>
            <div className="text-xl font-medium text-black">Welcome, {user.username}!</div>
            <p className="text-gray-500">You have successfully logged in.</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
        >
          Logout
        </button>
      </div>
    );
  };
  
  export default Dashboard;
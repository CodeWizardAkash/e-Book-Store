import { useEffect, useState } from "react";
import { getProfile, logout } from "../services/auth.service";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data.user);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleLogout = async () => {
    try {
      const data = await logout();

      alert(data.message);
      window.location.reload();
      setUser(null);

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  if (!user) return (
    <Link>Loding...</Link>
  );

  return (
    <div className="mt-25">
        <Link to={'/'}>
            <button
                className="btn btn-error"
                onClick={handleLogout}
            >
                Logout
            </button>
        </Link>
        <div className="max-w-lg mx-auto p-6 shadow rounded">
            <h1 className="text-3xl font-bold mb-5">My Profile</h1>

            <p><strong>Name:</strong> {user.fullname}</p>

            <p><strong>Email:</strong> {user.email}</p>

            <p><strong>Role:</strong> {user.role}</p>

            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
    </div>
  );
}

export default Profile;
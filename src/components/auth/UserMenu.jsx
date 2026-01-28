import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice.js";
import { selectCurrentUser } from "../../store/selectors.js";
import { resetTasksOnLogout } from "../../store/index.js";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      resetTasksOnLogout();
      dispatch(logout());
    }
  };

  if (!user) return null;

  // Get initials for avatar
  const getInitials = (username) => {
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg 
                   hover:bg-gray-100 transition-colors cursor-pointer"
      >
        {/* Avatar */}
        <div
          className="w-8 h-8 bg-blue-600 text-white rounded-full 
                        flex items-center justify-center text-sm font-semibold"
        >
          {getInitials(user.username)}
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {user.username}
        </span>
        <span
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg 
                        border border-gray-200 py-2 z-50 animate-[fade-in_0.2s_ease-in-out]"
        >
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">
              {user.username}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => {
                setIsOpen(false);
                // Could open profile modal here
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 
                         hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
            >
              <span>👤</span>
              Profile
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                // Could open settings modal here
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 
                         hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
            >
              <span>⚙️</span>
              Settings
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 pt-2">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 
                         hover:bg-red-50 flex items-center gap-2 cursor-pointer"
            >
              <span>🚪</span>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

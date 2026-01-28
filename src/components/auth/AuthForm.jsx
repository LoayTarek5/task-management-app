import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register, clearError } from "../../store/slices/authSlice.js";
import { selectAuthError, selectAuthLoading } from "../../store/selectors.js";
import { loadUserTasksFromStorage } from "../../store/index.js";

const AuthForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
    dispatch(clearError());
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setValidationError("Username is required");
      return false;
    }

    if (formData.username.length < 3) {
      setValidationError("Username must be at least 3 characters");
      return false;
    }

    if (!isLogin) {
      if (!formData.email.trim()) {
        setValidationError("Email is required");
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setValidationError("Please enter a valid email");
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setValidationError("Passwords do not match");
        return false;
      }
    }

    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    if (!validateForm()) return;

    let result;

    if (isLogin) {
      result = dispatch(login(formData.username, formData.password));
    } else {
      result = dispatch(
        register(formData.username, formData.email, formData.password),
      );
    }

    // Load user tasks after successful login/register
    if (result.success) {
      const user = result.user;
      loadUserTasksFromStorage(user?.id);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setValidationError("");
    dispatch(clearError());
  };

  const displayError = validationError || error;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 
                    flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <span className="text-5xl">✅</span>
            Task Manager
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        {/* Form Card */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>

          {/* Error Message */}
          {displayError && (
            <div
              className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 
                            rounded-lg text-sm animate-[fade-in_0.2s_ease-in-out]"
            >
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input"
                placeholder="Enter your username"
                autoComplete="username"
                disabled={isLoading}
              />
            </div>

            {/* Email (only for register) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                placeholder="Enter your password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                disabled={isLoading}
              />
            </div>

            {/* Confirm Password (only for register) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary w-full py-3 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  {isLogin ? "Signing in..." : "Creating account..."}
                </span>
              ) : (
                <span>{isLogin ? "Sign In" : "Create Account"}</span>
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleMode}
              className="ml-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
              disabled={isLoading}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Demo: Create any account to get started!</p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

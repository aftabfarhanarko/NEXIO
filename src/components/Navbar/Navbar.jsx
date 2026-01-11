import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import {
  Home,
  Grid3x3,
  Download,
  Sun,
  Moon,
  LayoutDashboard,
  User,
  Box,
  Menu,
  X,
  LogOut,
  Settings,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosAPi from "../../hook/useAPi";
import { toast } from "sonner";

const Navbar = () => {
  const axiosApi = useAxiosAPi();
  const { user, logOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogOut = () => {
    logOutUser().then(() => {
      toast.success("Logout User Successfully");
      setIsDropdownOpen(false);
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const link = (
    <>
      <NavLink
        to="/"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors"
        onClick={closeMobileMenu}
      >
        <Home className="w-5 h-5" />
        <span className="text-base font-medium">Home</span>
      </NavLink>

      <NavLink
        to="/allApp"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors"
        onClick={closeMobileMenu}
      >
        <Grid3x3 className="w-5 h-5" />
        <span className="text-base font-medium">Apps</span>
      </NavLink>

      <NavLink
        to="/install"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors"
        onClick={closeMobileMenu}
      >
        <Download className="w-5 h-5" />
        <span className="text-base font-medium">Installation</span>
      </NavLink>

      {user && (
        <>
          <NavLink
            to="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors"
            onClick={closeMobileMenu}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-base font-medium">Dashboard</span>
          </NavLink>

          <NavLink
            to="/my-profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors"
            onClick={closeMobileMenu}
          >
            <User className="w-5 h-5" />
            <span className="text-base font-medium">Profile</span>
          </NavLink>
        </>
      )}
    </>
  );

  const { data: sinngleUser } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosApi.get(`singleUser?email=${user?.email}`);
      console.log("Single User", res);
      return res.data;
    },
  });
  console.log(sinngleUser);

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50 border-b border-base-300">
      <div className="navbar max-w-[1250px] mx-auto px-4">
        {/* Left Side - Logo with Full Name Visible */}
        <div className="navbar-start">
          <Link
            to="/"
            className="text-primary font-bold text-xl md:text-2xl flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Box className="w-7 h-7 md:w-8 md:h-8 fill-primary/20" />
            <span>NEXIO</span>
          </Link>
        </div>

        {/* Desktop Menu - Center */}
        <div className="navbar-center hidden lg:flex">
          <div className="flex items-center gap-1">{link}</div>
        </div>

        {/* Right Side - Theme Toggle, User & Mobile Menu */}
        <div className="navbar-end flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle hover:bg-base-200"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {user ? (
            <div className="relative">
              {/* Avatar Button - Clickable */}
              <button
                onClick={toggleDropdown}
                className="btn btn-ghost btn-circle avatar hover:bg-base-200"
              >
                <div className="w-10 h-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                  <img
                    alt="User avatar"
                    src={
                      sinngleUser?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    className="rounded-full object-cover"
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />

                  {/* Dropdown Content */}
                  <div className="absolute right-0 mt-2 w-56 bg-base-100 rounded-lg shadow-xl border border-base-300 overflow-hidden z-20">
                    <div className="p-4 border-b border-base-300 bg-base-200">
                      <p className="font-semibold text-sm truncate">
                        {sinngleUser?.displayName || "User"}
                      </p>
                      <p className="text-xs text-base-content/60 truncate">
                        {sinngleUser?.email}
                      </p>
                    </div>

                    <ul className="p-2">
                      <li>
                        <Link
                          to="/my-profile"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                          <span className="ml-auto badge badge-primary badge-sm">
                            New
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/settings"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </Link>
                      </li>
                      <li className="border-t border-base-300 mt-2 pt-2">
                        <button
                          onClick={handleLogOut}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-error/10 text-error w-full transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth/login">
                <button className="btn btn-sm md:btn-md bg-gradient-to-tr from-[#632EE3] to-[#9F62F2] text-white border-none hover:opacity-90">
                  Login
                </button>
              </Link>
              <Link to="/auth/rigister" className="hidden sm:block">
                <button className="btn btn-sm md:btn-md bg-gradient-to-tr from-[#632EE3] to-[#9F62F2] text-white border-none hover:opacity-90">
                  Register
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button - Right Side */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-ghost btn-square lg:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-base-300 bg-base-100">
          <div className="max-w-[1250px] mx-auto px-4 py-4 flex flex-col gap-2">
            {link}
          </div>
        </div>
      )}

      {/* <ToastContainer /> */}
    </div>
  );
};

export default Navbar;

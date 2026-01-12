import React, { useContext, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Smartphone,
  Monitor,
  Tablet,
  ArrowUp,
  ArrowDown,
  Bell,
  Search,
  Menu,
  LayoutDashboard,
  ShoppingBag,
  Settings,
  LogOut,
  ChevronRight,
  MoreHorizontal,
  Filter,
  Download,
  CreditCard,
  Wallet,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import useAxiosAPi from "../../hook/useAPi";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "sonner";

const Dashbord = () => {
  const { user } = useContext(AuthContext);
  const axiosApi = useAxiosAPi();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const revenueData = [
    { name: "Mon", revenue: 4000, cost: 2400 },
    { name: "Tue", revenue: 3000, cost: 1398 },
    { name: "Wed", revenue: 2000, cost: 9800 },
    { name: "Thu", revenue: 2780, cost: 3908 },
    { name: "Fri", revenue: 1890, cost: 4800 },
    { name: "Sat", revenue: 2390, cost: 3800 },
    { name: "Sun", revenue: 3490, cost: 4300 },
  ];

  const deviceData = [
    { name: "Mobile", value: 400, color: "#6366f1" },
    { name: "Desktop", value: 300, color: "#10b981" },
    { name: "Tablet", value: 300, color: "#f59e0b" },
    { name: "Other", value: 200, color: "#ef4444" },
  ];

  // ALl User Show userAll
  const {
    data: allusers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosApi.get(`userAll`);
      return res?.data;
    },
  });

  console.log(allusers);

  const updeatNow = (role, id) => {
    axiosApi
      .patch("/updeatRole", {
        role,
        id,
      })
      .then(() => {
        toast.success(`Updeat Role ${role}`);
        // console.log("Role updated", res.data);
        refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleMakeAdmin = (user) => {
    updeatNow("admin", user._id);
  };

  const handleMakeUser = (user) => {
    updeatNow("user", user._id);
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  console.log(isLoading);
  
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="min-h-screen bg-base-200 flex font-sans overflow-hidden relative selection:bg-primary/20">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[100px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-base-100/80 backdrop-blur-2xl border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        <div className="p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
          <h1 className="relative text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20 ring-4 ring-white/10">
              <LayoutDashboard size={22} />
            </div>
            NEXIO
          </h1>
        </div>

        <nav className="flex-1 px-6 space-y-2 overflow-y-auto py-4 scrollbar-hide">
          <p className="px-4 text-xs font-bold text-base-content/40 uppercase tracking-wider mb-4">
            Main Menu
          </p>
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: Users, label: "Users", active: false },
            { icon: ShoppingBag, label: "Products", active: false },
            { icon: Activity, label: "Analytics", active: false },
            { icon: Wallet, label: "Transactions", active: false },
          ].map((item, idx) => (
            <a
              key={idx}
              href="#"
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 group relative overflow-hidden ${
                item.active
                  ? "bg-gradient-to-r from-primary to-primary-focus text-primary-content shadow-lg shadow-primary/20"
                  : "text-base-content/60 hover:bg-base-200 hover:text-base-content"
              }`}
            >
              {item.active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <item.icon
                size={20}
                className={
                  item.active
                    ? ""
                    : "group-hover:scale-110 transition-transform"
                }
              />
              <span className="relative z-10">{item.label}</span>
              {!item.active && (
                <ChevronRight
                  size={16}
                  className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                />
              )}
            </a>
          ))}

          <p className="px-4 text-xs font-bold text-base-content/40 uppercase tracking-wider mt-8 mb-4">
            General
          </p>
          <a
            href="#"
            className="flex items-center gap-4 px-4 py-3.5 text-base-content/60 hover:bg-base-200 hover:text-base-content rounded-2xl font-medium transition-all duration-300 group"
          >
            <Settings
              size={20}
              className="group-hover:rotate-90 transition-transform duration-500"
            />{" "}
            Settings
          </a>
        </nav>

        <div className="p-6 border-t border-base-content/5 relative">
          <div className="relative bg-gradient-to-tr from-primary/10 to-secondary/10 p-5 rounded-2xl border border-primary/10 mb-4 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-3 mb-2 relative z-10">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <TrendingUp size={16} />
              </div>
              <span className="font-bold text-sm">Pro Plan</span>
            </div>
            <p className="text-xs text-base-content/60 mb-3 relative z-10">
              Get 20% off on your next upgrade.
            </p>
            <button className="btn btn-xs btn-primary w-full relative z-10 shadow-lg shadow-primary/20 border-none">
              Upgrade Now
            </button>
          </div>
          <button className="flex items-center gap-3 px-4 py-3 text-error w-full hover:bg-error/10 rounded-2xl transition-colors font-medium">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden relative z-10 h-screen overflow-y-auto scroll-smooth">
        {/* Top Header */}
        <header className="bg-base-100/70 backdrop-blur-xl border-b border-white/10 p-4 lg:p-6 flex justify-between items-center sticky top-0 z-30 transition-all duration-300 supports-[backdrop-filter]:bg-base-100/50">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden btn btn-ghost btn-circle"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div
              className={`relative hidden md:block group transition-all duration-300 ${
                searchFocused ? "w-96" : "w-80"
              }`}
            >
              <Search
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  searchFocused ? "text-primary" : "text-base-content/40"
                }`}
              />
              <input
                type="text"
                placeholder="Search anything..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="input bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary/20 pl-12 w-full rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <kbd className="kbd kbd-sm text-[10px] font-sans bg-base-100/50">
                  ⌘
                </kbd>
                <kbd className="kbd kbd-sm text-[10px] font-sans bg-base-100/50">
                  K
                </kbd>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 lg:gap-6">
            <button className="btn btn-ghost btn-circle relative hover:bg-base-200/50">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-base-100 animate-pulse"></span>
            </button>
            <div className="h-8 w-[1px] bg-base-content/10 hidden lg:block"></div>
            <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-base-200/50 p-2 rounded-xl transition-all hover:scale-105 active:scale-95">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold leading-tight">Admin User</p>
                <p className="text-xs text-base-content/50">admin@nexio.com</p>
              </div>
              <div className="avatar placeholder online">
                <div className="bg-gradient-to-tr from-primary to-secondary text-white rounded-full w-10 ring-4 ring-base-100/50 shadow-lg">
                  <span className="text-sm font-bold">AD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <motion.div
          className="p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto pb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {activeTab === "Dashboard" && (
            <>
              {/* Welcome Section */}
              <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                <div>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl font-black text-base-content mb-2 tracking-tight"
                  >
                    Dashboard
                  </motion.h2>
                  <p className="text-base-content/60 font-medium">
                    Welcome back! Here's your overview.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="btn bg-base-100/80 backdrop-blur-md border-base-content/10 hover:border-base-content/20 shadow-sm rounded-xl normal-case hover:bg-base-100">
                    <Calendar size={18} /> Last 30 Days
                  </button>
                  <button className="btn btn-primary shadow-lg shadow-primary/30 rounded-xl normal-case text-white border-none hover:bg-primary-focus">
                    <Download size={18} /> Export Report
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    label: "Total Revenue",
                    value: "$54,239",
                    icon: DollarSign,
                    color: "text-success",
                    bg: "bg-success",
                    trend: "+12.5%",
                  },
                  {
                    label: "Total Users",
                    value: "2,543",
                    icon: Users,
                    color: "text-primary",
                    bg: "bg-primary",
                    trend: "+8.2%",
                  },
                  {
                    label: "New Sales",
                    value: "345",
                    icon: ShoppingBag,
                    color: "text-warning",
                    bg: "bg-warning",
                    trend: "-2.4%",
                  },
                  {
                    label: "Bounce Rate",
                    value: "42.3%",
                    icon: Activity,
                    color: "text-error",
                    bg: "bg-error",
                    trend: "+4.1%",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-base-100/60 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl shadow-base-content/5 border border-white/20 relative overflow-hidden group transition-all duration-300"
                  >
                    <div
                      className={`absolute -top-10 -right-10 w-40 h-40 ${stat.bg} opacity-[0.05] rounded-full group-hover:scale-150 transition-transform duration-700 ease-in-out blur-3xl`}
                    />
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div
                        className={`p-3.5 rounded-2xl ${stat.bg}/10 ${stat.color} shadow-sm ring-1 ring-inset ring-white/20`}
                      >
                        <stat.icon size={26} />
                      </div>
                      <span
                        className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg ${
                          stat.trend.startsWith("+")
                            ? "bg-success/10 text-success"
                            : "bg-error/10 text-error"
                        } border border-transparent group-hover:border-current/10 transition-colors`}
                      >
                        {stat.trend.startsWith("+") ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )}
                        {stat.trend}
                      </span>
                    </div>
                    <h3 className="text-3xl font-black mb-1 tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-base-content/60 font-medium">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Charts Row 1: Area & Pie */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Growth Chart */}
                <motion.div
                  variants={itemVariants}
                  className="xl:col-span-2 bg-base-100/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl shadow-base-content/5 border border-white/20 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Activity size={200} />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 relative z-10 gap-4">
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <span className="w-2 h-8 bg-primary rounded-full"></span>
                        Revenue Analytics
                      </h3>
                      <p className="text-sm text-base-content/50 ml-4">
                        Income vs Expenses over time
                      </p>
                    </div>
                    <div className="flex gap-2 bg-base-200/50 p-1 rounded-xl backdrop-blur-md">
                      {["Week", "Month", "Year"].map((t) => (
                        <button
                          key={t}
                          className={`btn btn-sm rounded-lg border-none ${
                            t === "Year"
                              ? "bg-white shadow-sm text-base-content"
                              : "btn-ghost text-base-content/60"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="h-[350px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient
                            id="colorRevenue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#6366f1"
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="95%"
                              stopColor="#6366f1"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorCost"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#10b981"
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="95%"
                              stopColor="#10b981"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          strokeOpacity={0.06}
                        />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#9ca3af", fontSize: 12 }}
                          dy={10}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#9ca3af", fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            backdropFilter: "blur(10px)",
                            border: "none",
                            borderRadius: "16px",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                            color: "#1f2937",
                          }}
                          itemStyle={{ color: "#1f2937", fontWeight: 600 }}
                          cursor={{
                            stroke: "#6366f1",
                            strokeWidth: 1,
                            strokeDasharray: "5 5",
                          }}
                        />
                        <Legend
                          iconType="circle"
                          wrapperStyle={{ paddingTop: "20px" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#6366f1"
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
                          strokeWidth={4}
                        />
                        <Area
                          type="monotone"
                          dataKey="cost"
                          stroke="#10b981"
                          fillOpacity={1}
                          fill="url(#colorCost)"
                          strokeWidth={4}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Device Distribution */}
                <motion.div
                  variants={itemVariants}
                  className="bg-base-100/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl shadow-base-content/5 border border-white/20 flex flex-col relative overflow-hidden"
                >
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <span className="w-2 h-8 bg-secondary rounded-full"></span>
                        Device Usage
                      </h3>
                      <p className="text-sm text-base-content/50 ml-4">
                        Sessions by device type
                      </p>
                    </div>
                    <button className="btn btn-circle btn-ghost btn-sm">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>

                  <div className="flex-1 min-h-[300px] relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deviceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          cornerRadius={8}
                        >
                          {deviceData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              strokeWidth={0}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            backdropFilter: "blur(8px)",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                          itemStyle={{ color: "#1f2937", fontWeight: 600 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-4xl font-black text-base-content">
                        85%
                      </span>
                      <span className="text-sm text-base-content/50 font-medium">
                        Mobile
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6 relative z-10">
                    {deviceData.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-white/30 p-2 rounded-xl"
                      >
                        <div
                          className="w-3 h-3 rounded-full shadow-sm"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm font-medium text-base-content/70">
                          {item.name}
                        </span>
                        <span className="text-sm font-bold ml-auto">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </>
          )}

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl font-black text-base-content mb-2 tracking-tight"
                >
                  Users Management
                </motion.h2>
                <p className="text-base-content/60 font-medium">
                  Manage your application users here.
                </p>
              </div>
            </div>

            <motion.div
              variants={itemVariants}
              className="bg-base-100/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl shadow-base-content/5 border border-white/20"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-8 bg-primary rounded-full"></span>
                  All Users List
                </h3>
                <div className="badge badge-primary badge-lg">
                  {/* {allusers?.length} Users */}
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-20">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
              ) : (
                <div className="max-w-7xl mx-auto">
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                      User Management
                    </h1>
                    <p className="text-gray-600">
                      Manage and monitor all registered users
                    </p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/20">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                            <th className="py-5 px-6 text-left text-xs font-semibold uppercase tracking-wider">
                              User
                            </th>
                            <th className="py-5 px-4 text-left text-xs font-semibold uppercase tracking-wider">
                              Role
                            </th>
                            <th className="py-5 px-4 text-left text-xs font-semibold uppercase tracking-wider">
                              Provider
                            </th>
                            <th className="py-5 px-4 text-left text-xs font-semibold uppercase tracking-wider">
                              Joined
                            </th>
                            <th className="py-5 px-6 text-right text-xs font-semibold uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {allusers?.map((user, index) => (
                            <motion.tr
                              key={user._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{
                                scale: 1.01,
                                backgroundColor: "rgba(99, 102, 241, 0.05)",
                              }}
                              className="hover:shadow-lg transition-all duration-300 group"
                            >
                              <td className="py-6 px-6">
                                <div className="flex items-center gap-4">
                                  <div className="relative">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-purple-200 group-hover:ring-purple-400 transition-all duration-300">
                                      <img
                                        src={
                                          user.photoURL ||
                                          "https://i.pravatar.cc/150?img=3"
                                        }
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                                  </div>
                                  <div>
                                    <div className="font-bold text-sm text-gray-800">
                                      {user?.name}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-0.5">
                                      {user.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-6 px-4">
                                <span
                                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                    user.role === "admin"
                                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                      : "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {user.role}
                                </span>
                              </td>
                              <td className="py-6 px-4">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      user.providerId === "google"
                                        ? "bg-red-400"
                                        : user.providerId === "github"
                                        ? "bg-gray-700"
                                        : "bg-blue-400"
                                    }`}
                                  ></div>
                                  <span className="text-sm text-gray-600 capitalize font-medium">
                                    {user.providerId}
                                  </span>
                                </div>
                              </td>
                              <td className="py-6 px-4 text-sm text-gray-600">
                                {user.userCreatAt
                                  ? new Date(
                                      user.userCreatAt
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })
                                  : "N/A"}
                              </td>
                              <td className="py-6 px-6 text-right">
                                {user?.role === "user" ? (
                                  <button
                                    onClick={() => handleMakeAdmin(user)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                                  >
                                    {/* Admin Icon */}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4.5l7 4-7 4-7-4 7-4z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 12l7 4 7-4"
                                      />
                                    </svg>
                                    Make Admin
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleMakeUser(user)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                                  >
                                    {/* User Icon */}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 18a8 8 0 0116 0"
                                      />
                                    </svg>
                                    Make User
                                  </button>
                                )}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashbord;

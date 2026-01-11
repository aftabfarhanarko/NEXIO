import React, { useState } from "react";
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

const Dashbord = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // --- Mock Data ---
  const userGrowthData = [
    { name: "Jan", users: 4000, active: 2400 },
    { name: "Feb", users: 3000, active: 1398 },
    { name: "Mar", users: 2000, active: 9800 },
    { name: "Apr", users: 2780, active: 3908 },
    { name: "May", users: 1890, active: 4800 },
    { name: "Jun", users: 2390, active: 3800 },
    { name: "Jul", users: 3490, active: 4300 },
  ];

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

          {/* Charts Row 2: Bar & Line */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Activity Bar Chart */}
            <motion.div
              variants={itemVariants}
              className="bg-base-100/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl shadow-base-content/5 border border-white/20"
            >
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <span className="w-2 h-8 bg-accent rounded-full"></span>
                Weekly User Activity
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userGrowthData} barGap={8}>
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
                      cursor={{ fill: "rgba(0,0,0,0.02)" }}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(8px)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar
                      dataKey="users"
                      fill="#6366f1"
                      radius={[6, 6, 6, 6]}
                      barSize={16}
                    >
                      {userGrowthData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fillOpacity={0.8 + index * 0.05}
                        />
                      ))}
                    </Bar>
                    <Bar
                      dataKey="active"
                      fill="#e5e7eb"
                      radius={[6, 6, 6, 6]}
                      barSize={16}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Performance Line Chart */}
            <motion.div
              variants={itemVariants}
              className="bg-base-100/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl shadow-base-content/5 border border-white/20"
            >
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <span className="w-2 h-8 bg-warning rounded-full"></span>
                App Performance Trends
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
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
                        backdropFilter: "blur(8px)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#f59e0b"
                      strokeWidth={4}
                      dot={{ r: 0 }}
                      activeDot={{
                        r: 8,
                        strokeWidth: 0,
                        fill: "#f59e0b",
                        stroke: "#fff",
                        strokeWidth: 3,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Recent Activity Table (Redesigned) */}
          <motion.div
            variants={itemVariants}
            className="bg-base-100/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl shadow-base-content/5 border border-white/20"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-8 bg-info rounded-full"></span>
                Recent Transactions
              </h3>
              <button className="btn btn-sm btn-ghost text-primary hover:bg-primary/10 rounded-lg">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-base-content/40 font-semibold uppercase tracking-wider text-xs">
                    <th className="py-4 bg-transparent border-none pl-6">ID</th>
                    <th className="py-4 bg-transparent border-none">User</th>
                    <th className="py-4 bg-transparent border-none">Service</th>
                    <th className="py-4 bg-transparent border-none">Date</th>
                    <th className="py-4 bg-transparent border-none">Amount</th>
                    <th className="py-4 bg-transparent border-none pr-6">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <motion.tr
                      key={item}
                      whileHover={{
                        scale: 1.01,
                        backgroundColor: "rgba(255,255,255,0.4)",
                      }}
                      className="bg-base-100/40 hover:shadow-md transition-all duration-200 group rounded-2xl"
                    >
                      <td className="font-mono text-xs font-medium opacity-60 py-5 pl-6 rounded-l-2xl border-none">
                        #TRX-78{item}9
                      </td>
                      <td className="py-5 border-none">
                        <div className="flex items-center gap-4">
                          <div className="avatar placeholder">
                            <div className="bg-gradient-to-tr from-neutral to-neutral-focus text-white rounded-xl w-10 shadow-md group-hover:shadow-lg transition-shadow">
                              <span className="text-xs font-bold">U{item}</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-sm text-base-content/90">
                              User Name {item}
                            </div>
                            <div className="text-xs opacity-50">
                              user{item}@example.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-medium text-sm py-5 border-none">
                        Premium Plan
                      </td>
                      <td className="text-sm opacity-70 py-5 border-none">
                        Oct 24, 2025
                      </td>
                      <td className="font-bold text-sm py-5 border-none">
                        $99.00
                      </td>
                      <td className="py-5 pr-6 rounded-r-2xl border-none">
                        <span
                          className={`badge border-0 font-bold py-3 px-4 ${
                            item % 2 === 0
                              ? "bg-success/10 text-success"
                              : "bg-warning/10 text-warning"
                          } group-hover:scale-105 transition-transform`}
                        >
                          {item % 2 === 0 ? "Completed" : "Pending"}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashbord;

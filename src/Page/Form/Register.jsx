import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";
// import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import {
  User,
  Image as ImageIcon,
  Mail,
  Lock,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import useAxiosAPi from "../../hook/useAPi";
import { toast } from "sonner";

const Register = () => {
  const [show, setShow] = useState(false);
  const locations = useLocation();
  const nagvit = useNavigate();
  const { creatUser, profileUbdeat, googleProvider } = useContext(AuthContext);
  const axiosApi = useAxiosAPi();

  const handelRegister = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const displayName = e.target.name?.value;
    const photoURL = e.target.photo.value;
    const password = e.target.password.value;

    const myPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;
    if (!myPass.test(password)) {
      toast.error(
        "Password must be 6+ chars with upper, lower & special character."
      );
      return;
    }

    const userData = {
      displayName,
      photoURL,
    };
    const sendDB = {
      email,
      displayName,
      photoURL,
      password,
      userCreatAt: new Date().toISOString(),
    };

    creatUser(email, password)
      .then(() => {
        profileUbdeat(userData).then(() => {
          console.log("User  Data", sendDB);
          axiosApi.post("users", sendDB).then((res) => {
            if (res.data.acknowledged) {
              toast.success("User Account Creat Successfully");
              nagvit(`${locations.state ? locations.state : "/"}`);
            }
            // console.log("Server Send", res);
          });
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handelGoogle = () => {
    googleProvider().then((res) => {
      console.log("Google Provider", res);
      const data = res.user;
      const sendDB = {
        email: data.email,
        displayName: data.displayName,
        photoURL: data.photoURL,
        providerId: data.providerId,
        userCreatAt: new Date().toISOString(),
      };
      axiosApi.post("users", sendDB).then((res) => {
        if (res.data.acknowledged) {
          toast.success("User Account Creat Successfully");
          nagvit(`${locations.state ? locations.state : "/"}`);
        }
        console.log(sendDB);
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-base-100 py-12 px-4">
      <title>Register From</title>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-50 animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] opacity-50 animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-md bg-base-100/60 backdrop-blur-xl shadow-sm  border border-white/20 relative z-10"
      >
        <div className="card-body p-8 sm:p-10">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
              className="w-16 h-16 bg-gradient-to-tr from-primary to-secondary rounded-2xl mx-auto flex items-center justify-center text-white mb-4 shadow-lg shadow-primary/30"
            >
              <UserPlus size={32} />
            </motion.div>
            <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
              Create Account
            </h1>
            <p className="text-base-content/60 font-medium">
              Join us and start your journey
            </p>
          </div>

          <form onSubmit={handelRegister} className="space-y-6">
            <fieldset className="fieldset p-0 border-none bg-transparent m-0 gap-5">
              {/* Name */}
              <div className="form-control w-full">
                <label className="label text-sm font-bold text-base-content/70 mb-1 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40 group-focus-within:text-primary transition-colors">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    className="input w-full pl-12 h-12 bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all font-medium"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              {/* Photo Url */}
              <div className="form-control w-full">
                <label className="label text-sm font-bold text-base-content/70 mb-1 ml-1">
                  Photo URL
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40 group-focus-within:text-primary transition-colors">
                    <ImageIcon size={20} />
                  </div>
                  <input
                    type="text"
                    name="photo"
                    className="input w-full pl-12 h-12 bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all font-medium"
                    placeholder="https://example.com/photo.jpg"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-control w-full">
                <label className="label text-sm font-bold text-base-content/70 mb-1 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40 group-focus-within:text-primary transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="input w-full pl-12 h-12 bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all font-medium"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control w-full">
                <label className="label text-sm font-bold text-base-content/70 mb-1 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40 group-focus-within:text-primary transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    className="input w-full pl-12 pr-12 h-12 bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all font-medium"
                    placeholder="Create a password"
                    required
                  />
                  <div
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-base-content/40 hover:text-primary transition-colors p-1"
                    onClick={() => setShow(!show)}
                  >
                    {show ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                  </div>
                </div>
              </div>

              {/* Remember me */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    defaultChecked
                    className="checkbox checkbox-primary rounded-xl"
                  />
                  <span className="label-text font-medium text-base-content/70">
                    Remember me
                  </span>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn btn-primary h-12 w-full rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 border-none text-lg font-bold relative overflow-hidden group mt-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="flex items-center justify-center gap-2">
                  Register <ArrowRight size={20} />
                </span>
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(var(--b2), 0.8)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handelGoogle}
                type="button"
                className="btn h-12 w-full bg-base-100 border border-base-content/10 hover:border-base-content/20 rounded-2xl shadow-sm hover:shadow-md transition-all normal-case text-base font-semibold"
              >
                <FcGoogle size={24} />
                <span className="ml-2">Google</span>
              </motion.button>

              <p className="text-center text-sm font-medium text-base-content/60 mt-4">
                Already have an account?{" "}
                <Link
                  className="text-primary hover:text-primary-focus font-bold hover:underline transition-all ml-1"
                  to="/auth/login"
                >
                  Sign In
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </motion.div>
      {/* <ToastContainer position="top-center" autoClose={3000} theme="colored" /> */}
    </div>
  );
};

export default Register;

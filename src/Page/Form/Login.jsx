import React, { useContext, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import useAxiosAPi from "../../hook/useAPi";
import { toast } from "sonner";

const Login = () => {
  const reaferncve = useRef(null);
  const [show, setShow] = useState(false);
  const axiosApi = useAxiosAPi();
  const { loginUser, passwordResetEmail, googleProvider } =
    useContext(AuthContext);
  const locations = useLocation();
  const nagvit = useNavigate();

  const handelLogin = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then(() => {
        toast.success("User Login Successfully");
        nagvit(`${locations.state ? locations.state : "/"}`);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handelForget = () => {
    const email = reaferncve.current?.value;
    passwordResetEmail(email)
      .then(() => {
        toast.success("Your Password Reset Email Provied Now");
      })
      .catch(() => {
        toast.error("Error Now");
      });
  };

  const handelGoogle = () => {
    googleProvider().then((res) => {
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
          toast.success("User Login Successfully");
          nagvit(`${locations.state ? locations.state : "/"}`);
        } else {
          toast.success(res.data.message);
          nagvit(`${locations.state ? locations.state : "/"}`);
        }
        console.log(sendDB);
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-base-100 py-12 px-4">
      <title>Login From</title>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-50 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] opacity-50 animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-md bg-base-100/60 backdrop-blur-xl shadow-2xl border border-white/20 relative z-10"
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
              <LogIn size={32} />
            </motion.div>
            <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
              Welcome Back
            </h1>
            <p className="text-base-content/60 font-medium">
              Enter your details to access your account
            </p>
          </div>

          <form onSubmit={handelLogin} className="space-y-6">
            <fieldset className="fieldset p-0 border-none bg-transparent m-0 gap-6">
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
                    ref={reaferncve}
                    name="email"
                    type="email"
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
                    className="input w-full pl-12 pr-12 h-12 bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all font-medium"
                    placeholder="Enter your password"
                    name="password"
                    required
                  />
                  <div
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-base-content/40 hover:text-primary transition-colors p-1"
                    onClick={() => setShow(!show)}
                  >
                    {show ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handelForget}
                    className="text-xs font-bold text-primary hover:text-primary-focus hover:underline transition-all"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn btn-primary h-12 w-full rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 border-none text-lg font-bold relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="flex items-center justify-center gap-2">
                  Sign In <ArrowRight size={20} />
                </span>
              </motion.button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-base-content/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-base-100 text-base-content/50 font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

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

              {/* Register link */}
              <p className="text-center text-sm font-medium text-base-content/60">
                Don’t have an account?{" "}
                <Link
                  className="text-primary hover:text-primary-focus font-bold hover:underline transition-all ml-1"
                  to="/auth/rigister"
                >
                  Create account
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

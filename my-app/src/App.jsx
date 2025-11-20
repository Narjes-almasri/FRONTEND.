import { useState } from "react";
import Cube from "./3dcub";

export default function AppBuilder() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7eb3c4] to-[#9cc9d4] flex items-center justify-center p-5">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="flex flex-col justify-between">
          <div className="bg-white/15 backdrop-blur-md rounded-3xl p-10 mb-5">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">log in</h1>
              <button
                onClick={() => alert("sign up")}
                className="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                sign up
              </button>
            </div>

            <div>
              <div className="mb-4">
                <label className="flex items-center bg-white/90 rounded-xl p-3 gap-3 hover:bg-white transition">
                  <span className="text-lg">✉</span>
                  <input
                    type="email"
                    placeholder="e-mail address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent outline-none flex-1 text-sm text-gray-900 placeholder-gray-600"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="flex items-center bg-white/90 rounded-xl p-3 gap-3 hover:bg-white transition">
                  <span className="text-lg">🔒</span>
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="bg-transparent outline-none flex-1 text-sm text-gray-900 placeholder-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="text-lg cursor-pointer hover:opacity-70 transition"
                  >
                    👁️
                  </button>
                </label>
              </div>

              <div className="text-xs text-gray-800 underline cursor-pointer mb-4 hover:text-gray-600">
                Forget Password?
              </div>

              <p className="text-sm text-gray-800 leading-6 mb-5">
                Lorem ipsum dolor sit amet consectetur. At orci feugiat turpis in erat vel. Sit odio cursus amet neque eget velit tellus elit.
              </p>

              <button
                onClick={() => alert("login: " + email)}
                className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl hover:bg-gray-700 hover:translate-x-1 transition"
              >
                →
              </button>
            </div>
          </div>

          <div className="bg-gray-900 text-white p-5 rounded-2xl text-base italic leading-7">
            Bring your ideas to life — build your app in seconds.
          </div>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow-2xl flex flex-col items-center text-center">
          <div className="mb-8">
            <h2 className="text-6xl font-bold text-gray-900 mb-2">New</h2>
            <h3 className="text-4xl text-gray-300 font-light">
              APP<br />BUILDER
            </h3>
          </div>

          <Cube />

          <div className="mb-8">
            <h4 className="text-base text-gray-900 mb-2 font-medium">Create apps instantly.</h4>
            <h4 className="text-base text-gray-900 mb-2 font-medium">No code needed.</h4>
            <h4 className="text-base text-gray-900 font-medium">Start building today!</h4>
          </div>

          <div className="flex items-center justify-between w-full mt-8 pt-8 border-t border-gray-200">
            <div className="text-xs text-gray-600 flex items-center gap-1">
              <span>🌍</span>
              <span>By T2B</span>
            </div>

            <button
              onClick={() => alert("build")}
              className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-gray-700 hover:translate-x-1 transition"
            >
              Build now
              <span>→</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}


// import { useState } from "react";
// import Cube from "./3dcub";

// export default function AppBuilder() {
//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");
//   const [show, setShow] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#7eb3c4] to-[#9cc9d4] flex items-center justify-center p-5">
//       <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10">

//         <div className="relative">
//           <div className="bg-white/15 backdrop-blur-md rounded-3xl p-10 pb-20">
//             <div className="flex justify-between items-center mb-8">
//               <h1 className="text-2xl font-semibold text-gray-900">log in</h1>
//               <button
//                 onClick={() => alert("sign up")}
//                 className="text-sm text-gray-600 hover:text-gray-900 transition"
//               >
//                 sign up
//               </button>
//             </div>

//             <div>
//               <div className="mb-4">
//                 <label className="flex items-center bg-white/90 rounded-xl p-3 gap-3 hover:bg-white transition">
//                   <span className="text-lg">✉</span>
//                   <input
//                     type="email"
//                     placeholder="e-mail address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="bg-transparent outline-none flex-1 text-sm text-gray-900 placeholder-gray-600"
//                   />
//                 </label>
//               </div>

//               <div className="mb-4">
//                 <label className="flex items-center bg-white/90 rounded-xl p-3 gap-3 hover:bg-white transition">
//                   <span className="text-lg">🔒</span>
//                   <input
//                     type={show ? "text" : "password"}
//                     placeholder="Password"
//                     value={pass}
//                     onChange={(e) => setPass(e.target.value)}
//                     className="bg-transparent outline-none flex-1 text-sm text-gray-900 placeholder-gray-600"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShow(!show)}
//                     className="text-lg cursor-pointer hover:opacity-70 transition"
//                   >
//                     👁️
//                   </button>
//                 </label>
//               </div>

//               <div className="text-xs text-gray-800 underline cursor-pointer mb-4 hover:text-gray-600">
//                 Forget Password?
//               </div>

//               <p className="text-sm text-gray-800 leading-6 mb-5">
//                 Lorem ipsum dolor sit amet consectetur. At orci feugiat turpis in erat vel. Sit odio cursus amet neque eget velit tellus elit.
//               </p>

//               <button
//                 onClick={() => alert("login: " + email)}
//                 className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl hover:bg-gray-700 hover:translate-x-1 transition"
//               >
//                 →
//               </button>
//             </div>
//           </div>
// {/* 
//           <div className="bg-gray-900 text-white p-5 rounded-2xl text-base italic leading-7 absolute bottom-0 left-0 right-0 translate-y-1/2">
//             Bring your ideas to life — build your app in seconds.
//           </div> */}
//         </div>

//         <div className="bg-white rounded-3xl p-10 shadow-2xl flex flex-col items-center text-center">
//           <div className="mb-8">
//             <h2 className="text-6xl font-bold text-gray-900 mb-2">New</h2>
//             <h3 className="text-4xl text-gray-300 font-light">
//               APP<br />BUILDER
//             </h3>
//           </div>

//           <Cube />

//           <div className="mb-8">
//             <h4 className="text-base text-gray-900 mb-2 font-medium">Create apps instantly.</h4>
//             <h4 className="text-base text-gray-900 mb-2 font-medium">No code needed.</h4>
//             <h4 className="text-base text-gray-900 font-medium">Start building today!</h4>
//           </div>

//           <div className="flex items-center justify-between w-full mt-8 pt-8 border-t border-gray-200">
//             <div className="text-xs text-gray-600 flex items-center gap-1">
//               <span>🌍</span>
//               <span>By T2B</span>
//             </div>

//             <button
//               onClick={() => alert("build")}
//               className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-gray-700 hover:translate-x-1 transition"
//             >
//               Build now
//               <span>→</span>
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

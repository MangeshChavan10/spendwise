import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

const AddSubscription = () => {
  const [titleFocused, setTitleFocused] = useState(false);
  const [title, setTitle] = useState("");
  const [active, setActive] = useState(true);

  const navigate = useNavigate();

  function handleClose(e) {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  }

  async function handleAddSubscription() {
    if (!title) {
      toast.error("Title is required");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/subscription/",
        { title, active },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Subscription added successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error adding subscription:", err);
      toast.error(err.response?.data?.msg || "Something went wrong");
    }
  }

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 flex justify-center items-center backdrop-blur z-50 bg-black/40"
    >
      <div className="bg-neutral-800 text-white h-fit rounded-xl w-fit p-10">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl">Add Subscription</h3>
          <div
            onClick={() => navigate(-1)}
            className="relative group inline-flex items-center justify-center h-10 w-10 -mt-3 -mr-3"
          >
            <span className="absolute inset-0 pointer-events-none bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-full"></span>
            <X size={18} className="text-white relative z-10 cursor-pointer" />
          </div>
        </div>

        <div className="mt-10">
          <span className="block">Subscription Name</span>
          <div className="relative mt-3 -ml-1">
            <input
              onFocus={() => {
                setTitleFocused(true);
              }}
              onBlur={() => {
                setTitleFocused(false);
              }}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className={`w-fit pl-12 pr-4 py-2 rounded-xl outline-none border-2 transition-all bg-neutral-900/50 text-white placeholder-neutral-500 text-lg 
                  ${
                    titleFocused
                      ? "border-blue-500 shadow-lg shadow-blue-500/20"
                      : "border-neutral-700 hover:border-neutral-600"
                  }`}
              type="text"
              placeholder="Enter subscription name"
            />
          </div>
        </div>

        <div className="mt-10">
          <span className="block">Status</span>
          <div className="flex items-center gap-3 mt-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-neutral-700 bg-neutral-900/50 checked:bg-blue-500 checked:border-blue-500 cursor-pointer accent-blue-500"
              />
              <span className="text-neutral-300">Active subscription</span>
            </label>
          </div>
        </div>

        <div onClick={handleAddSubscription} className="mt-10 flex items-center">
          <button className="bg-linear-to-r shadow-lg shadow-blue-500/50 cursor-pointer from-blue-600 to-blue-500 py-2 px-10 mx-auto hover:scale-105 transition-hover rounded">
            Add Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubscription;
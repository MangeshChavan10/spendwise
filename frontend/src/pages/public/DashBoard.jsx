import React, { useEffect, useState } from "react";
import { CircleCheckBig, CirclePause, EllipsisVertical} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import SubscriptionCard from "../../components/SubscriptionCard";

const DashBoard = () => {
  const navigate = useNavigate();
  const [transactions, setTransaction] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null); 
  const [subscription,setSubscription] = useState([]);
  const [subTitle,setSubTitle] = useState("");
  const [subActive,setSubActive] = useState(false);

  useEffect(() => {
    fetchExpenses();
    fetchSubscription();
  }, []);

  async function fetchExpenses() {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/expense", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransaction(res.data.data || []);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  }

  async function fetchSubscription() {
    try {

      const token = localStorage.getItem("token");
      const res = await api.get("/subscription/",{
        headers:{Authorization:`Bearer ${token}`}
      });
      setSubscription(res.data.data || []);
      
    } catch (error) {
      console.error("Error fetching subscriptions:", err);
      
    }
    
  }

  async function handleSubscription(){
    const token = localStorage.getItem("token");
    const res = await api.post("/subscription/addSubscription",{

    });

  }

  const getIconByCategory = (category) => {
    if (category=== "Food") return "🍕";
    if (category=== "Transport") return "💼";
    if (category=== "Shopping") return "🛍️";
    if (category=== "Bills") return "🧾";
    if (category=== "Entertainment") return "📺";
    if (category=== "Health") return "🏥";
    if (category=== "Other") return "📦";
  };

  const handleEdit = (id) => {
    console.log("Edit:", id);
    setMenuOpen(null);
  };

  const handleDelete = (id) => {
    console.log("Delete:", id);
    setMenuOpen(null);
  };

  return (
    <div  className="p-6 space-y-4 w-[80vh]">
      <div className="flex items-center justify-between">
        <h3 className="font-light text-white text-2xl">Transactions</h3>
        <span
          onClick={() => navigate("/addTransaction")}
          className="bg-white active:scale-90 transition-active duration-200 rounded p-3 mx-4 font-medium cursor-pointer"
        >
          Add Transaction
        </span>
      </div>


      <div className="flex gap-30 w-275">
      <div className="overflow-y-auto h-140 flex-1">
      {transactions.length === 0 ? (
        <p className="text-gray-400">No transactions yet.</p>
      ) : (
        transactions.map((t, index) => {
          const Icon = getIconByCategory(t.category);

          return (
            <div
              key={index}
              className="relative mt-3 w-140 flex gap-8 py-5 items-center justify-between text-white bg-[#222222] p-3 rounded-xl"
            >
              
              <div className="flex items-center gap-3 h-12">
                {t.type?.toLowerCase() === "debited" ? (
                  <div className="bg-neutral-500 rounded-full flex items-center justify-center p-3">
                    <p className="text-3xl">{Icon}</p>
                  </div>
                ) : (
                  <div className="bg-neutral-500 rounded-full flex items-center justify-center p-3">
                    <p className="text-3xl">💳</p>
                  </div>
                )}

                <div className="pl-3">
                  <p className="text-xl font-semibold">{t.amount} INR</p>
                  <p className="opacity-80">{t.title}</p>
                </div>
              </div>

              <div className="relative">
                <div onClick={()=>{setMenuOpen(menuOpen === index ? null : index)}} className="p-2 hover:bg-neutral-500 rounded-full active:scale-90">
                  <EllipsisVertical />
                </div>
                {
                  
                  menuOpen === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-neutral-800 border border-neutral-700 rounded-xl shadow-lg z-50">
                    <button
                      onClick={() => handleEdit(t._id)}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-700 rounded-t-xl"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-700 rounded-b-xl"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                  )
                }

              </div>

              
              
            </div>
          );
        })
      )}

      </div>

      <div className="h-120 shadow-xl shadow-black w-100 ">
            <div className="flex text-white justify-between items-center p-6">
              <h3 className="text-xl">Subscription</h3>
              <button
               onClick={()=>navigate("/addSubscription")}
               className="p-3 rounded cursor-pointer active:scale-90 transition-active duration-200 text-black bg-white">Add Subscription</button>
            </div>
            <div className="px-6">
              {
                subscription.map((elem,idx)=>(
                  <div className="flex bg-neutral-800 items-center p-3 mt-4 rounded justify-between  text-white">
                    <h3 className="text-2xl">{elem.title}</h3>
                    {elem.active ?
                    <CircleCheckBig color="green" />
                    :
                    <CirclePause color="gray" />
                  }
                  </div>
                ))
              }
            </div>
      </div>


      </div>
    

      
    </div>
  );
};

export default DashBoard;

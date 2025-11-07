import { X, Tag, IndianRupee, CreditCard } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";


const AddTransaction = () => {
      const [isFocused,setFocused] = useState(false);
      const [titleFocused,setTitleFocused] = useState(false);
      const [isCategoryFocused,setCategoryFocused] = useState(false);
      const [title,setTitle] = useState("");
      const [emoji,setEmoji] = useState(0);
      const [amount,setAmount] = useState("");
      const [category,setCategory] = useState("");
      const [type,setType] = useState("");
      const [isTypeFocused,setTypeFocused] = useState(false);
      
      const navigate = useNavigate();
      function handleClose(e){
          if(e.target === e.currentTarget){
            navigate(-1);
          }
      }

      async function handleAddExpense() {
        if(!title || !amount){
          alert("Title and amount are required");
          return;
        }
        try{
          const token = localStorage.getItem("token");
          const res = await api.post("/expense/",{title,emoji,amount,type,category},{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })

          toast.success("Expenses added successfully")
          navigate("/dashboard")
        }catch(err){
          console.error("Error adding expense:", err);
          toast.error(err.response?.data?.msg || "Something went wrong")
        }
        
      }
      return (
        <div onClick={handleClose} className="fixed inset-0 flex justify-center items-center backdrop-blur z-50 bg-black/40">
          <div className="bg-neutral-800 text-white h-fit rounded-xl w-fit p-10">
            <div className="flex justify-between items-center">
            <h3 className="text-2xl">Add Transaction</h3>
            <div onClick={()=>navigate(-1)} className="relative group inline-flex items-center justify-center h-10 w-10 -mt-3 -mr-3">

              <span className="absolute inset-0 pointer-events-none  bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-full"></span>

              <X size={18} className="text-white relative z-10 cursor-pointer" />
            </div>

            </div>

            <div className="mt-10">
                <span className="block">Title</span>
                <div className="relative mt-3 -ml-1">
                <input 
                onFocus={()=>{setTitleFocused(true)}} 
                onBlur={()=>{setTitleFocused(false)}}
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                className={`w-fit pl-12 pr-4 py-2 rounded-xl outline-none border-2 transition-all bg-neutral-900/50 text-white placeholder-neutral-500 text-lg 
                  ${titleFocused ? "border-blue-500 shadow-lg shadow-blue-500/20" : "border-neutral-700 hover:border-neutral-600"}`} 
                type="text"
                placeholder= "Enter the Title" 
                />
                </div>
              </div>

              <div className="mt-10">
                <span className="block">Amount</span>
                <div className="relative mt-3 -ml-1">
                  <div className="absolute inset-0 pl-4 flex items-center pointer-events-none">
                    <IndianRupee className={`absolute transition-colors ${isFocused ? "text-blue-400": "text-neutral-500"} `} size={15}/>
                    </div>
                <input 
                onFocus={()=>{setFocused(true)}} 
                onBlur={()=>{setFocused(false)}}
                onChange={(e)=>{setAmount(e.target.value)}}
                className={`w-fit pl-12 pr-4 py-2 rounded-xl outline-none border-2 transition-all bg-neutral-900/50 text-white placeholder-neutral-500 text-lg 
                  ${isFocused ? "border-blue-500 shadow-lg shadow-blue-500/20" : "border-neutral-700 hover:border-neutral-600"}`} 
                type="text"
                placeholder= "0.00" 
                />
                </div>
              </div>




               <div className="mt-10">
              <span className="block">Type</span>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 pl-4 flex items-center pointer-events-none">
                  <CreditCard className={`w-5 h-5 transition-colors ${isTypeFocused? "text-blue-400" : "text-neutral-500"} `}/>
                </div>
              <select
              name="category" 
              value={type}
              onChange={(e)=>{setType(e.target.value)}}
              onFocus={()=>{setTypeFocused(true)}} 
              onBlur={()=>{setTypeFocused(false)}}
             className={`w-full pl-12 pr-4 py-2 rounded-xl outline-none border-2 transition-all bg-neutral-900/50 text-white appearance-none cursor-pointer text-lg
                ${isTypeFocused ? "border-blue-500 shadow-lg shadow-blue-500/20" : "border-neutral-700 hover:border-neutral-600"}`}
           
              >

               <option value="" className="bg-neutral-800">Select a category</option>
              <option value="credited" className="bg-neutral-800">Credited</option>
              <option value="debited" className="bg-neutral-800">Debited</option>
              </select>
              </div>
              </div>





            {type === "debited" ?
            <div className="mt-10">
              <span className="block">Category</span>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 pl-4 flex items-center pointer-events-none">
                  <Tag className={`w-5 h-5 transition-colors ${isCategoryFocused? "text-blue-400" : "text-neutral-500"} `}/>
                </div>
              <select
              name="category" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={()=>{setCategoryFocused(true)}} 
              onBlur={()=>{setCategoryFocused(false)}}
             className={`w-full pl-12 pr-4 py-2 rounded-xl outline-none border-2 transition-all bg-neutral-900/50 text-white appearance-none cursor-pointer text-lg
                ${isCategoryFocused ? "border-blue-500 shadow-lg shadow-blue-500/20" : "border-neutral-700 hover:border-neutral-600"}`}

              >

                <option value="">Select a Category</option>
                <option value="Food">🍔 Food</option>
                <option value="Transport">🚗 Transport</option>
                <option value="Shopping">🛍️ Shopping</option>
                <option value="Bills">💳 Bills</option>
                <option value="Entertainment">🎬 Entertainment</option>
                <option value="Health">🏥 Health</option>
                <option value="Other">📦 Others</option>
              </select>
              </div>
              </div>
                : null } 


                
            
                <div onClick={handleAddExpense} className="mt-10 flex items-center">
                  <button className="bg-linear-to-r shadow-lg shadow-blue-500/50 cursor-pointer from-blue-600 to-blue-500 py-2 px-10 mx-auto hover:scale-105 transition-hover rounded">Add Transaction</button>
                </div>
            </div>
             
        </div>

      )
};

export default AddTransaction;

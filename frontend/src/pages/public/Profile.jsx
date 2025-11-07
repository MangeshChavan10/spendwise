import React, { useEffect, useState } from 'react'
import api from "../../api/axios"
import { Edit, Lock, X, Check, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editPassword, setEditPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await api.get("/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(res.data.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    const handlePasswordUpdate = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New passwords don't match");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await api.put("/user/update", {
                currentPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Password updated successfully");
            setEditPassword(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update password");
        }
    }

    const handleCancel = () => {
        setEditPassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const navigate = useNavigate();

    return (
        <div className='bg-neutral-900 min-h-screen w-full flex  items-center justify-center p-4'>
            <div onClick={()=>{navigate("/dashboard")}} className='absolute left-0 top-0 m-10 flex gap-3 items-center cursor-pointer text-white'>
                <ArrowLeft size={32}/>
                <h3 className='text-2xl'>Back</h3>
            </div>
            <div className='max-w-2xl w-full bg-neutral-800 rounded-3xl shadow-2xl shadow-indigo-400 overflow-hidden'>
                <div className='h-24 bg-linear-to-r from-blue-500 to-indigo-600 flex items-center'>
                    <h3 className='px-10 text-3xl text-white font-semibold'>Profile</h3>
                </div>

                <div className='p-8'>
                    
                    <div className='mb-8'>
                        <h3 className='text-lg font-semibold mb-3 text-white'>Email</h3>
                        <div className='flex group border-2 border-neutral-700 p-4 rounded-2xl justify-between items-center bg-neutral-900/50 hover:border-neutral-600 transition-all'>
                            <p className='text-neutral-300 group-hover:text-white transition-colors duration-300'>
                                {user?.email || 'Loading...'}
                            </p>
                            <Lock className='text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300' size={20} />
                        </div>
                    </div>

               
                    <div>
                        <h3 className='text-lg font-semibold mb-3 text-white'>
                            {editPassword ? 'Change Password' : 'Password'}
                        </h3>

                        {!editPassword ? (
                            <div className='flex group border-2 border-neutral-700 p-4 rounded-2xl justify-between items-center bg-neutral-900/50 hover:border-neutral-600 transition-all'>
                                <p className='text-neutral-300 group-hover:text-white transition-colors duration-300'>
                                    ••••••••••••
                                </p>
                                <Edit
                                    onClick={() => setEditPassword(true)}
                                    className='cursor-pointer hover:text-blue-400 transition-colors text-neutral-400 active:scale-90'
                                    size={20}
                                />
                            </div>
                        ) : (
                            <div className='space-y-6'>
                                
                                <div>
                                    <label className='block text-sm text-neutral-400 mb-2'>Current Password</label>
                                    <input
                                        className='w-full border-2 border-neutral-700 bg-neutral-900/50 p-4 rounded-2xl text-white placeholder-neutral-500 outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 transition-all'
                                        type='password'
                                        placeholder='Enter current password'
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </div>

                                
                                <div>
                                    <label className='block text-sm text-neutral-400 mb-2'>New Password</label>
                                    <input
                                        className='w-full border-2 border-neutral-700 bg-neutral-900/50 p-4 rounded-2xl text-white placeholder-neutral-500 outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 transition-all'
                                        type='password'
                                        placeholder='Enter new password'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm text-neutral-400 mb-2'>Confirm New Password</label>
                                    <input
                                        className='w-full border-2 border-neutral-700 bg-neutral-900/50 p-4 rounded-2xl text-white placeholder-neutral-500 outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 transition-all'
                                        type='password'
                                        placeholder='Confirm new password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                
                                <div className='flex gap-4 pt-2'>
                                    <button
                                        onClick={handlePasswordUpdate}
                                        className='flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 shadow-lg shadow-blue-500/30'
                                    >
                                        <Check size={18} />
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className='flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105'
                                    >
                                        <X size={18} />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
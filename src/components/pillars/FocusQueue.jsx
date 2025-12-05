import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';

const FocusQueue = () => {
    const [queue, setQueue] = useState(() => {
        const saved = localStorage.getItem('khai_focus_queue');
        return saved ? JSON.parse(saved) : [];
    });
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        localStorage.setItem('khai_focus_queue', JSON.stringify(queue));
    }, [queue]);

    const addTask = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newTask = {
            id: Date.now(),
            text: inputValue.trim(),
            createdAt: new Date().toISOString()
        };

        setQueue(prev => [...prev, newTask]);
        setInputValue('');
    };

    const completeTask = (id) => {
        setQueue(prev => prev.filter(task => task.id !== id));
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-600 p-1 rounded text-xs">TACTICAL</span>
                Focus Queue
            </h3>

            <form onSubmit={addTask} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="What is the NEXT step?"
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white rounded-xl px-4 flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all"
                >
                    <Plus size={24} />
                </button>
            </form>

            <div className="space-y-2">
                {queue.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-slate-100 rounded-xl">
                        <p className="text-slate-400 text-sm font-medium">Queue is empty. Stay focused.</p>
                    </div>
                )}

                {queue.map(task => (
                    <div
                        key={task.id}
                        className="group flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-2"
                    >
                        <span className="font-medium text-slate-700">{task.text}</span>
                        <button
                            onClick={() => completeTask(task.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                            title="Complete"
                        >
                            <Check size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FocusQueue;

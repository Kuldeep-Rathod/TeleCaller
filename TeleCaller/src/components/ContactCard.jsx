import React, { useState, useEffect } from "react";
import { PhoneCall, MessageCircle, Info, SquarePen, MessageCircleMore } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";


const PROXY_SERVER = import.meta.env.VITE_PROXY_SERVER;

const ContactCard = ({ contact }) => {
    if (!contact) return null;

    const { id, name, mobile, email, fetched_description } = contact;
    const [showModal, setShowModal] = useState(false);
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [description, setDescription] = useState("");
    const [dateTime, setDateTime] = useState(new Date());

    // 🔹 Load border state from localStorage on mount
    useEffect(() => {
        const savedState = localStorage.getItem(`highlighted-${id}`);
        if (savedState === "true") {
            setIsHighlighted(true);
        }
    }, [id]);

    useEffect(() => {
        if(fetched_description){
            setDescription(fetched_description);
        }
    }, [fetched_description]);

    const handleCall = () => {
        let formattedNumber = mobile.startsWith("+91") ? mobile : `+91${mobile}`;
        window.location.href = `tel:${formattedNumber}`;
    };

    const handleWhatsApp = () => {
        let formattedNumber = mobile.startsWith("+91") ? mobile : `+91${mobile}`;
        window.open(`https://wa.me/${formattedNumber}`, "_blank");
    }

    const handleInfoClick = () => {
        setShowModal(true);
        setIsHighlighted(true);
        localStorage.setItem(`highlighted-${id}`, "true"); // 🔹 Save to localStorage
    };


const handleSubmit = async () => {
    const newData = { id, name, mobile, email, description, dateTime };

    try {
        const response = await fetch(`${PROXY_SERVER}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData),
        });

        if (!response.ok) {
            throw new Error("Failed to update Google Sheet.");
        }

        const result = await response.json();
        console.log("Sheet Update Response:", result);

        // ✅ Success Toast (Auto Close)
        Swal.fire({
            icon: "success",
            title: "Updated Successfully!",
            text: result.message,
            timer: 2000, // Auto-close after 2 seconds
            showConfirmButton: false,
            toast: true,
            position: "top-end",
        });

        setShowModal(false);
    } catch (error) {
        console.error("Error updating sheet:", error);

        // ❌ Error Toast (Auto Close)
        Swal.fire({
            icon: "error",
            title: "Update Failed!",
            text: "Failed to update sheet. Check console for details.",
            timer: 2000, // Auto-close after 2 seconds
            showConfirmButton: false,
            toast: true,
            position: "top-end",
        });
    }
};


    return (
        <div
            className={`p-4 shadow-md rounded-xl border w-full max-w-sm mx-auto text-white text-sm transition ${
                isHighlighted ? "border-red-500" : "border-gray-300"
            }`}
        >
            <div className="flex justify-between items-center">
                <div className="flex flex-col text-start">
                    <p className="max-[321px]:text-[10px] text-base">{name}</p>
                    <p className="text-gray-300 max-[321px]:text-[8px] ">{mobile}</p>
                </div>

                <div className="flex gap-1">
                    <button
                        onClick={handleCall}
                        className="border p-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                        <PhoneCall size={12} />
                    </button>
                    <button
                        onClick={handleWhatsApp}
                        className="border p-1 rounded bg-blue-700 text-white hover:bg-blue-800 transition"
                    >
                        <MessageCircleMore size={12} />
                    </button>
                    <button
                        onClick={handleInfoClick}
                        className="border p-1 rounded bg-gray-800 text-white hover:bg-gray-700 transition"
                    >
                        <SquarePen size={12} />
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-4 rounded-lg shadow-xl text-center w-full max-w-xs">
                        <h3 className="text-base font-semibold mb-3 text-gray-900">
                            Add Details
                        </h3>
                        <textarea
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border p-2 w-full h-20 resize-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-sm"
                        />
                        <div className="mt-3">
                            <DatePicker
                                selected={dateTime}
                                onChange={(date) => setDateTime(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-sm"
                            />
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="border px-3 py-1.5 rounded bg-black text-white hover:bg-gray-900 text-sm"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="border px-3 py-1.5 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactCard;

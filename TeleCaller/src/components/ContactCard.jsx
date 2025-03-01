import React, { useState } from "react";
import { PhoneCall, MessageCircle, Info } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PROXY_SERVER = import.meta.env.VITE_PROXY_SERVER;

const ContactCard = ({ contact }) => {
    if (!contact) return null;

    const { name, mobile, email } = contact;
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState("");
    const [dateTime, setDateTime] = useState(new Date());

    const handleCall = () => (window.location.href = `tel:${mobile}`);
    const handleWhatsApp = () =>
        window.open(`https://wa.me/${mobile}`, "_blank");

    const handleSubmit = async () => {
        const newData = {
            id: contact.id,
            name: contact.name,
            mobile: contact.mobile,
            email: contact.email,
            description: description,
            dateTime: dateTime,
        };

        try {
            const response = await fetch(`${PROXY_SERVER}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newData),
            });

            if (!response.ok) {
                throw new Error("Failed to update Google Sheet.");
            }

            const result = await response.json();
            console.log("Sheet Update Response:", result);
            alert(result.message);
            setShowModal(false);
        } catch (error) {
            console.error("Error updating sheet:", error);
            alert("Failed to update sheet. Check console for details.");
        }
    };

    return (
        <div className="p-4 md:p-6 shadow-lg rounded-2xl border bg-white w-full max-w-md mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg md:text-xl text-gray-800 font-semibold">
                        {name}
                    </h2>
                    <p className="text-gray-800 font-medium text-sm">
                        Mobile: {mobile}
                    </p>
                    <p className="text-gray-600 text-sm">Email: {email}</p>
                </div>
                <button
                    onClick={handleCall}
                    className="p-3 md:p-4 rounded-full flex items-center gap-1 md:gap-2 bg-[#04AA6D] text-black"
                >
                    <PhoneCall className="text-white" size={18} />
                </button>
            </div>

            <div className="flex justify-around mt-4 gap-2 md:gap-">
                <button
                    onClick={handleWhatsApp}
                    className=" px-3 md:px-4 py-2 rounded flex items-center gap-1 md:gap-2 bg-[#25D366] text-black"
                >
                    <MessageCircle size={18} /> WhatsApp
                </button>
                <button
                    onClick={() => setShowModal(true)}
                    className=" px-3 md:px-4 py-2 rounded flex items-center gap-1 md:gap-2 bg-[#BDD9F2] text-black"
                >
                    <Info size={18} /> Info
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl text-center w-[90%] max-w-md">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Add Details
                        </h3>
                        <textarea
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border border-gray-300 text-gray-800 p-3 w-full h-28 resize-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div className="mt-4">
                            <DatePicker
                                selected={dateTime}
                                onChange={(date) => setDateTime(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                className="border border-gray-300 text-gray-800 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className=" px-4 py-2 rounded bg-red-500 text-black hover:bg-red-600"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleSubmit}
                                className=" px-4 py-2 rounded bg-blue-500 text-black hover:bg-blue-600"
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

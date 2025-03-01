import React, { useState, useEffect } from "react";
import ContactCard from "./ContactCard"; // Import the contact card component

const GOOGLE_SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID; // Replace with your sheet ID
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; // Replace with your API Key
const SHEET_NAME = import.meta.env.VITE_GOOGLE_SHEET_NAME; // Change to your sheet name

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
                );
                const data = await response.json();
                // console.log("Fetched Data:", data.values); // Debugging

                if (!data.values || data.values.length === 0) {
                    throw new Error("No data found.");
                }

                // Extract headers (first row) and data (remaining rows)
                const rows = data.values.slice(1); // Skip header row

                const formattedData = rows.map((row, index) => ({
                    id: row[0] && !isNaN(row[0]) ? row[0] : `generated-${index + 1}`, // Ensure unique ID
                    name: row[1] || "Unknown",
                    mobile: row[2] || "N/A",
                    email: row[3] || "N/A",
                    fetched_description: row[4] || "N/A",
                }));
                

                setContacts(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Contact List</h2>
            {loading ? (
                <p>Loading contacts...</p>
            ) : (
                <div className=" overflow-y-auto space-y-4 mt-4">
                    {contacts.map((contact) => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContactList;

import React, { useState, useEffect } from "react";
import { createTelegramLink, getTelegramLinks } from "../firestoreOps";
import { useAuth } from "../scenes/authentication/auth-context";

const TelegramChats = (value) => {
    const username = useAuth().currentUser.displayName;
    const moduleCode = value.moduleCode;
    const [groupChats, setGroupChats] = useState([]);

    const [isAddingNewLink, setIsAddingNewLink] = useState(false);
    const [telegramLink, setTelegramLink] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        //wait for the data to be retrieved from firestore
        console.log("moduleCode", moduleCode);
        getTelegramLinks(moduleCode).then((groupChats) => {
            setGroupChats(groupChats);
            console.log(groupChats);
        });
    }, [value.moduleCode]);

    function handleAddNewLink() {
        setIsAddingNewLink(true);
    }

    function handleUploadLink() {
        createTelegramLink(telegramLink, description, moduleCode, username);
        setIsAddingNewLink(false);
        //refresh the page
        getTelegramLinks(moduleCode).then((groupChats) => {
            setGroupChats(groupChats);
        });
    }

    function handleCancelUploadLink() {
        setIsAddingNewLink(false);
    }

    const [formData, setFormData] = useState({
        index: "",
        description: "",
        link: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate the form data (you can add more validation if needed)

        // Create a new group chat object
        const newGroupChat = {
            index: formData.index,
            description: formData.description,
            link: formData.link,
        };

        // Update the groupChats state with the new group chat
        setGroupChats([...groupChats, newGroupChat]);

        // Clear the form data after submission
        setFormData({
            index: "",
            description: "",
            link: "",
        });
    };

    return (
        <div>
            <label className="block dark:text-white text-gray-700 text-lg font-bold mb-2">
                Share the tutorial group chat/ lecture group chat here!
            </label>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleAddNewLink()}
            >
                Upload a new Link
            </button>
            {groupChats.length === 0 && (
                <div className="text-lg dark:text-white text-gray-700 font-bold mb-2 mt-4">
                    No group chats available now, why not start adding a new link?
                </div>
            )}
            {groupChats.length > 0 && (
                <table className="border-collapse border border-gray-700 mt-4">
                    <thead>
                        <tr>
                            <th className="border border-gray-700 px-4 py-2"></th>
                            <th className="border border-gray-700 px-4 py-2">
                                Description
                            </th>
                            <th className="border border-gray-700 px-4 py-2">
                                Link
                            </th>
                            <th className="border border-gray-700 px-4 py-2">
                                Upload By
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupChats.map((telegramLink, index) => (
                            <tr key={index}>
                                <td className="border border-gray-700 px-4 py-2">
                                    {index + 1}
                                </td>
                                <td className="border border-gray-700 px-4 py-2">
                                    {telegramLink.description}
                                </td>
                                <td className="border border-gray-700 px-4 py-2">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                telegramLink.link
                                            );
                                            alert(
                                                "Link copied to clipboard!\n" + telegramLink.link
                                            );
                                        }}
                                        className="dark:hover:text-gray-400 dark:text-white text-black hover:text-gray-500 font-bold py-2 px-4 rounded"
                                    >
                                        {telegramLink.link}
                                    </button>
                                </td>
                                <td className="border border-gray-700 px-4 py-2">
                                    {telegramLink.uploadBy}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {isAddingNewLink && (
                <div class="fixed top-0 left-0 z-[1010] w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full bg-gray-600 bg-opacity-50">
                    <div className="flex justify-center h-full items-center">
                        <div class="w-full max-w-2xl max-h-full">
                            {/* <!-- Modal content --> */}
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-900">
                                {/* <!-- Modal header --> */}
                                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Upload a new Telegram Link
                                    </h3>
                                    <button
                                        onClick={() =>
                                            setIsAddingNewLink(false)
                                        }
                                        type="button"
                                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-hide="staticModal"
                                    >
                                        <svg
                                            class="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {/* <!-- Modal body --> */}
                                <div class="p-6 space-y-2 flex flex-col">
                                    <label className="text-lg">
                                        Telgram Link
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setTelegramLink(e.target.value)
                                        }
                                        className="border-2 rounded dark:bg-black dark:text-white"
                                    />
                                    <label className="text-lg pt-2">
                                        Description
                                    </label>
                                    <label className="text-sm">
                                        Please indicate the type of group chat and the time and day of the week, if applicable
                                        (e.g. Lecture Group Chat - Every Monday 2pm-4pm / Tutorial Group Chat - Every Tuesday 4pm-6pm)
                                    </label>
                                    <textarea
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        className="border-2 rounded dark:bg-black dark:text-white h-32"
                                    />
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        onClick={handleUploadLink}
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Upload
                                    </button>
                                    <button
                                        onClick={handleCancelUploadLink}
                                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TelegramChats;

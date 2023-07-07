import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { createDiscussion, getDiscussions } from "../firestoreOps";
// User authentication import
import { useAuth } from "../scenes/authentication/auth-context";
import { toast } from 'react-toastify'
const GeneralDiscussion = (value) => {
    const [isStartingDiscussion, setIsStartingDiscussion] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [discussions, setDiscussions] = useState([]);
    const moduleCode = value.moduleCode;
    const username = useAuth().currentUser.displayName;
    useEffect(() => {
        //wait for the data to be retrieved from firestore
        getDiscussions(moduleCode).then((discussions) => {
            setDiscussions(discussions);
        }
        );
    }, []);
    function handleStartDiscussion() {
        console.log("Start a new discussion");
        setIsStartingDiscussion(true);
    }

    function handlePostDiscussion() {
        console.log("Post a new discussion");
        createDiscussion(title, description, moduleCode, username);
        setIsStartingDiscussion(false);
        //refresh the page
        getDiscussions(moduleCode).then((discussions) => {
            setDiscussions(discussions);
        }
        );
    }

    function handleCancelDiscussion() {
        console.log("Cancel a new discussion");
        setIsStartingDiscussion(false);
    }

    return (
        <div>
            <h1>General Discussion</h1>
            <button
                onClick={() => handleStartDiscussion()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Start a new discussion
            </button>
            {isStartingDiscussion && (
                <div class="fixed top-0 left-0 z-[1010] w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full bg-gray-600 bg-opacity-50">
                    <div className="flex justify-center h-full items-center">
                        <div class="w-full max-w-2xl max-h-full">
                            {/* <!-- Modal content --> */}
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-900">
                                {/* <!-- Modal header --> */}
                                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Start A new Discussion
                                    </h3>
                                    <button
                                        onClick={() =>
                                            setIsStartingDiscussion(false)
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
                                        Title 
                                    </label>
                                    <input 
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="border-2 rounded bg-black text-white" />
                                    <label className="text-lg pt-2">
                                        Description
                                    </label>
                                    <textarea
                                        onChange={(e) => setDescription(e.target.value)}                                
                                        className="border-2 rounded bg-black text-white h-32" />
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        onClick={handlePostDiscussion}
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Post
                                    </button>
                                    <button
                                        onClick={handleCancelDiscussion}
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
            {/* { allDiscussions.map((discussion) => (
                <div className="border-2 border-black">
                    <h1>{discussion.title}</h1>
                    <h2>{discussion.description}</h2>
                    <h3>{discussion.username}</h3>
                    <h4>{discussion.moduleCode}</h4>
                    <h5>{discussion.createdAt}</h5>
                </div>
            ))
            } */}

            {
                discussions.map((discussion) => (
                    <div className="border-2 border-black">
                        <h1>{discussion.title}</h1>
                        <h2>{discussion.description}</h2>
                        <h3>{discussion.username}</h3>
                        <h4>{discussion.moduleCode}</h4>
                    </div>
                ))

            }
        </div>
    );
};

export default GeneralDiscussion;

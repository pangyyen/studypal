import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { createDiscussion, getDiscussions, createComment } from "../firestoreOps";
// User authentication import
import { useAuth } from "../scenes/authentication/auth-context";
const GeneralDiscussion = (value) => {
    const [isStartingDiscussion, setIsStartingDiscussion] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [discussions, setDiscussions] = useState([]);
    const moduleCode = value.moduleCode;
    const username = useAuth().currentUser.displayName;

    //array of comments depnding on the discussion length
    const [commentsText, setCommentsText] = useState([]);
    useEffect(() => {
        //wait for the data to be retrieved from firestore
        console.log("moduleCode", moduleCode);
        getDiscussions(moduleCode).then((discussions) => {
            setDiscussions(discussions);
            console.log(discussions);
            //initialize the commentsText array
            var temp = [];
            for (var i = 0; i < discussions.length; i++) {
                temp.push("");
            }
            setCommentsText(temp);
        });
    }, [value.moduleCode]);
    function handleStartDiscussion() {
        console.log("Start a new discussion");
        setIsStartingDiscussion(true);
    }

    function handlePostDiscussion() {
        console.log("Post a new discussion");
        if (title.length == 0 || description.length == 0) {
            alert("Please fill in the title and description");
            return;
        }
        createDiscussion(title, description, moduleCode, username);
        setIsStartingDiscussion(false);
        //refresh the page
        getDiscussions(moduleCode).then((discussions) => {
            setDiscussions(discussions);
        });
    }

    function handleCancelDiscussion() {
        console.log("Cancel a new discussion");
        setIsStartingDiscussion(false);
    }
    function addComment(index) {
        var text = commentsText[index];
        console.log("Add a new comment");
        if (text.length > 0) {
            createComment(text, moduleCode, username, discussions[index].id);
            //refresh the page
            getDiscussions(moduleCode).then((discussions) => {
                setDiscussions(discussions);
            });
        }
        //reset the commentsText
        var temp = commentsText;
        temp[index] = "";
        setCommentsText(temp);
        //reset the textarea
        document.getElementById(index + "comment").value = "";
    }
    return (
        <div className="w-full">
            <h1 data-testid="general-discussion-title">
                {moduleCode} General Discussion
            </h1>
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
                                        Start a new Discussion
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
                                    <label className="text-lg">Title</label>
                                    <input
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        className="border-2 rounded dark:bg-black dark:text-white"
                                    />
                                    <label className="text-lg pt-2">
                                        Description
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
            {discussions.map((discussion, index) => (
                <div className="border-2 border-black dark:border-gray-600 p-2 my-2">
                    <div className="text-3xl">{discussion.title}</div>
                    <div className="text-xl py-3">{discussion.description}</div>
                    <div className="grid grid-cols-2 text-xs dark:border-b-white border-b-black border-b-4 pb-4">
                        <div class="flex flex-col text-left">
                            <div>Posted by:</div>
                            <div>{discussion.username}</div>
                        </div>
                        <div class="flex flex-col text-right">
                            <div>Posted on:</div>
                            <div>{discussion.createdAt}</div>
                        </div>
                    </div>

                    {/* Comment Section */}
                    <div className="my-4">
                        <h4 className="text-lg font-semibold">Comments:</h4>
                        {discussion.comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="border-t border-gray-400 mt-2 pt-2"
                            >
                                <div className="text-sm font-medium">
                                    {comment.username}
                                </div>
                                <div className="text-xs">{comment.text}</div>
                                <div className="text-xs text-gray-500">
                                    {comment.createdAt}
                                </div>
                            </div>
                        ))}
                        <div
                            // onSubmit={handleCommentSubmit(discussion.id)}
                            className="mt-4"
                        >
                            <textarea
                                id = {index + "comment"}
                                className="border-2 rounded dark:bg-black dark:text-white w-full"
                                onChange={(e) =>{
                                    var temp = commentsText;
                                    temp[index] = e.target.value;
                                    setCommentsText(temp);
                                    console.log(commentsText)
                                    
                                }
                                }
                                rows="2"
                                placeholder="Write your comment..."
                            />
                            <br />
                            <button
                                onClick={() => addComment(index)}
                                className="bg-[#4CCEAC] text-white px-3 py-1 mt-2 rounded"
                            >
                                Add Comment
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GeneralDiscussion;

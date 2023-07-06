import { Box, Button, Typography, ButtonGroup } from "@mui/material";

import {React, useState} from "react";
import Sidebar from "../../components/SideBar";
const Module = () => {
    const moduleCode = "HSI 1001";
    const moduleFullName = "How Science Work, Why Science Work";
    const [page, setPage] = useState("study-jios");
    const handleStudyJios = () => {
        setPage("study-jios");
    };
    const handleSharedFiles = () => {
        setPage("shared-files");
    };
    const handleTelegramChats = () => {
        setPage("telegram-chats");
    };
    const handleGeneralDiscussion = () => {
        setPage("general-discussion");
    };
    return (
        <Box display="flex">
            <Sidebar />
            <Box m="20px" flex="1">
                <Box sx={{ display: "flex" }}>
                    <Typography variant="h1">
                        {moduleCode} {moduleFullName}
                    </Typography>
                    {/* <Select
                        labelId="a"
                        id="asdf"
                        value="AY22"
                        label="AY 2023 Sem 1"
                        onChange=""
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select> */}
                </Box>
                <div className="flex">
                    <div class="mx-1 flex">
                        <button
                            className="bg-gray-700 rounded-xl text-white p-4 flex m-3"
                            onClick={handleStudyJios}
                        >
                            Study Jios
                            <div className="rounded-full bg-blue-600 w-5 h-5 ml-2">
                                2
                            </div>
                        </button>
                        <div class="h-10 border-l-4 border-solid border-blue-500 rounded my-5 ml-[-1rem]"></div>
                    </div>
                    <div class="mx-1 flex">
                        <button
                            className="bg-gray-700 rounded-xl text-white p-4 flex m-3"
                            onClick={handleSharedFiles}
                        >
                            Shared Files
                            <div className="rounded-full bg-purple-600 w-5 h-5 ml-2">
                                3
                            </div>
                        </button>
                        <div class="h-10 border-l-4 border-solid border-purple-500 rounded my-5 ml-[-1rem]"></div>
                    </div>
                    <div class="mx-1 flex">
                        <button
                            className="bg-gray-700 rounded-xl text-white p-4 flex m-3"
                            onClick={handleTelegramChats}
                        >
                            Telegram Chats
                            <div className="rounded-full bg-red-600 w-5 h-5 ml-2">
                                2
                            </div>
                        </button>
                        <div class="h-10 border-l-4 border-solid border-red-500 rounded my-5 ml-[-1rem]"></div>
                    </div>
                    <div class="mx-1 flex">
                        <button
                            className="bg-gray-700 rounded-xl text-white p-4 flex m-3"
                            onClick={handleGeneralDiscussion}
                        >
                            General Discussion
                            <div className="rounded-full bg-yellow-600 w-5 h-5 ml-2">
                                2
                            </div>
                        </button>
                        <div class="h-10 border-l-4 border-solid border-yellow-500 rounded my-5 ml-[-1rem]"></div>
                    </div>
                </div>
                <div className="flex">
                    {page === "study-jios" && (
                        <div>
                            <div className="flex justify-between">
                                <Typography variant="h2">
                                    Study Jios
                                </Typography>
                            </div>
                        </div>
                    )}
                    {page === "shared-files" && (
                        <div>
                            <div className="flex justify-between">
                                <Typography variant="h2">
                                    Shared Files
                                </Typography>
                            </div>
                        </div>
                    )}
                    {page === "telegram-chats" && (
                        <div>
                            <div className="flex justify-between">
                                <Typography variant="h2">
                                    Telegram Chats
                                </Typography>
                            </div>
                        </div>
                    )}
                    {page === "general-discussion" && (
                        <div>
                            <div className="flex justify-between">
                                <Typography variant="h2">
                                    General Discussion
                                </Typography>
                            </div>
                        </div>
                    )}
                </div>
            </Box>
        </Box>
    );
};

export default Module;

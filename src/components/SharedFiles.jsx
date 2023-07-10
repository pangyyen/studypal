import React from "react";
import { useState, useEffect } from "react";
import { Button, ButtonGroup, Typography } from "@mui/material";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    getMetadata,
} from "firebase/storage";
import UploadFIleSection from "./UploadFileSection";
import { storage } from "../config/firebase-config";
import { v4 } from "uuid";

const SharedFiles = (value) => {
    const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState([]);
    const moduleCode = value.moduleCode;
    const fileListRef = ref(storage, `sharedFiles/${moduleCode}`);
    function handleFile(e) {
        setFile(e.target.files[0]);
    }
    function handleUpload() {
        if (file == null) return;
        const fileref = ref(storage, `sharedFiles/${moduleCode}/${file.name}`);
        uploadBytes(fileref, file).then((snapshot) => {
            console.log("Uploaded a blob or file!");
        });
        setFile(null);
    }
    useEffect(() => {
        listAll(fileListRef).then((response) => {
            response.items.forEach((item) => {
                // getMetadata(item).then((metadata) => {
                //     setFileList((fileList) => [...fileList, metadata]);
                // });
                //get download url and metadata together
                getDownloadURL(item).then((url) => {
                    getMetadata(item).then((metadata) => {
                        setFileList((fileList) => [
                            ...fileList,
                            { ...metadata, url: url, name: item.name },
                        ]);
                    });
                });
            });
        });
    }, []);

    return (
        <div className="flex flex-col w-full">
            <UploadFIleSection
                file={file}
                handleFile={handleFile}
            ></UploadFIleSection>
            <div className="flex flex-col items-center justify-center w-full">
                {file ? (
                    <div>
                        <button
                            onClick={handleUpload}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Upload
                        </button>
                        <button
                            onClick={() => setFile(null)}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                ) : null}
            </div>
            <div className="text-left text-2xl font-bold">Uploaded Files</div>
            <table className="table-style">
                <thead>
                    <tr>
                        <th className="text-left">File Name</th>
                        <th className="text-right">File Size</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody>
                    {fileList.map((file) => (
                        <tr>
                            <td className="text-left">{file.name}</td>
                            <td className="text-right">{file.size / 8} KB</td>
                            <td className="">
                                <div className="flex justify-center items-center">
                                    <a
                                        href={file.url}
                                        download
                                        className="hover:text-green-500"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SharedFiles;

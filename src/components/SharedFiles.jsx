import React from 'react'
import { useState, useEffect } from 'react'
import { Button, ButtonGroup, Typography } from '@mui/material'
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'
import { storage } from '../config/firebase-config'
import { v4 } from 'uuid'
const SharedFiles = (value) => {
    const [file, setFile] = useState(null)
    const [fileList, setFileList] = useState([]);
    const moduleCode = value.moduleCode
    const fileListRef = ref(storage, `sharedFiles/${moduleCode}`);
    function handleFile(e) {
        setFile(e.target.files[0])
        console.log(e.target.files[0])
    }
    function handleUpload() {
        if (file == null) return;
        const fileref = ref(storage, `sharedFiles/${moduleCode}/${file.name}`);
        uploadBytes(fileref, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        setFile(null)
    }
    useEffect(() => {
        listAll(fileListRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setFileList((fileList) => [...fileList, url]);
            });
          });
        });
        console.log("fileList", fileList)
      }, []);

    return (
    <div className='flex flex-col w-full'>
        <div className="flex items-center justify-center w-full">
            <label onChange={handleFile} 
                for="dropzone-file" 
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                {file ? (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{file.name}</p>
                        
                        <p className="text-xs text-gray-500 dark:text-gray-400">{file.size / 8} KB</p>
                    </div>
                ) : 
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span></p>
                </div>
                }
                <input id="dropzone-file" type="file" className="hidden" />
            </label>
        </div> 
        <div className="flex flex-col items-center justify-center w-full">
        {file ? (
            <div>
                <button 
                    onClick={handleUpload}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Upload
                </button>
                <button 
                    onClick={() => setFile(null)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Cancel
                </button>
            </div>
                )
        : null    
        }
        </div>
        <ul className="flex flex-col items-center justify-center w-full">
            
            {fileList.map((file) => (
                <li className="flex flex-col items-center justify-center w-full cursor-pointer" >
                   <a href={file} download>
                        Click Here
                    </a> 
                </li>
            ))}
        </ul>
    </div>
  )
}

export default SharedFiles
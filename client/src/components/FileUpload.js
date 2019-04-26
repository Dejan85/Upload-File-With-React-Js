import React, { useState } from 'react';
import axios from 'axios';

// components
import Message from './Message';
import Progress from './Progress';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadFile, setUploadFile] = useState({});
    const [message, setMessage] = useState("");
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    console.log(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
                    // clear percentage
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            });

            const { fileName, filePath } = res.data;
            setUploadFile({ fileName, filePath })
            setMessage("File Uploaded")

        } catch (err) {
            if (err.response.status === 500) {
                console.log('There was a problem with the server');
                setMessage('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }

    return (
        <>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
                <div className='custom-file mb-4'>
                    <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>
                <Progress percentage={uploadPercentage} />
                <input type="submit" value="upload" className="btn btn-primary btn-block mt-4" />
            </form>
            {uploadFile ? <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <h3 className="text-center">
                        {uploadFile.fileName}
                    </h3>
                    <img sryle={{ width: "100%" }} src={uploadFile.filePath} />
                </div>
            </div> : null}
        </>
    )
}

export default FileUpload;
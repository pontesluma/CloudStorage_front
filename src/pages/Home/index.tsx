import React, { useCallback, useEffect, useState } from 'react';
import {
    Paper,
    Typography,
    IconButton,
    Box,
    Button
} from '@material-ui/core';
import {
    ImageRounded,
    DeleteRounded,
    GetAppRounded,
    CloudDoneRounded,
    CloudUploadRounded
} from '@material-ui/icons';

import { useStyles } from './styles';
import api from '../../service/api';

const Home: React.FC = () => {
    const classes = useStyles();
    const [files, setFiles] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const adequateFileName = useCallback((filename) => filename.replace(/ /g, '\\ '), []);

    useEffect(() => {
        const loadFiles = async () => {
            const response = await api.get('/list/file');
            setFiles(response.data.files);
            setLoading(false);
        };
        setLoading(true);
        loadFiles();
    }, []);

    const onChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        const file =  event.target.files;
        if (file && file.length > 0) formData.append('file', file[0]);
        setLoading(true);
        const response = await api.post('/upload/file', formData);
        setFiles([...files, response.data.filename]);
        setLoading(false);
    }, [files]);

    const handleDeleteFile = useCallback(async (filename) => {
        setLoading(true);
        await api.delete(`/delete/file?filename=${adequateFileName(filename)}`);
        setFiles(files.filter(file => file !== filename));
        setLoading(false);
    }, [adequateFileName, files])

    const handleDownloadFile = useCallback(async (filename) => {
        setLoading(true);

        const response = await api.get(`/download/file?filename=${filename}`, {responseType: 'blob'});
        
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();

        setLoading(false);
    }, [])

    return (
        <Box className={classes.root}>
            
            <Typography className={classes.title}>
                <CloudDoneRounded style={{ fontSize: 50, marginRight: 10 }} />
                Cloud Storage
                {loading && <span className={classes.loading} >Carregando...</span>}
            </Typography>

            {files.map((file) => (
                <Paper className={classes.file} elevation={3} key={file}>
                <Box className={classes.filename}>
                    <ImageRounded color="disabled" />
                    <Typography style={{ fontSize: 18, marginLeft: 10 }}>{file}</Typography>
                </Box>
                <Box>
                    <IconButton onClick={() => handleDownloadFile(file)}>
                        <GetAppRounded color="disabled"/>
                    </IconButton>
                    <IconButton onClick={() => handleDeleteFile(file)}>
                        <DeleteRounded color="disabled"/>
                    </IconButton>
                </Box>
            </Paper>
            ))}
            

            <Button variant="contained" className={classes.uploadBtn} >

            <input
                  type="file"
                  id="uploadFile"
                  onChange={onChange}
                  style={{ display: 'none' }}
                />
                <label
                className={classes.labelBtn}
                  htmlFor="uploadFile"
                  style={{ cursor: 'pointer' }}
                >
                  <CloudUploadRounded style={{marginRight: 10, fontSize: 24}} />
                Upload
                </label>
                
            </Button>

        </Box>
    
    );
};


export default Home;
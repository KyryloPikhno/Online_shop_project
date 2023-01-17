import {useState} from "react";

import css from './Admin.module.css';
import {Button} from "@mui/material";
import axios from "axios";


const Admin = () => {
    const [file, setFile] = useState();

    const [img, setImg] = useState({});
    console.log(img);

    // const {device} = useSelector(state => state.deviceReducer);

    // console.log(device);

    // const dispatch = useDispatch();

    const UploadContent = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const send = (event) => {
        const info = new FormData();
        info.append('deviceIMG', file);
        console.log(info);

        // dispatch(deviceActions.create({info}))

        axios.post(
            "http://localhost:5400/devices",
            info,
            {
                headers: {
                    "Content-type": "multipart/form-data"
                },
            }
        )
            .then(res => {
                setImg(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className={css.container}>
            <img src={img.img}/>
            <input
                // accept="image/jpeg"
                id="contained-button-content"
                multiple
                type="file"
                onChange={UploadContent}
            />
            <Button variant="contained" color="primary" onClick={send}>
                send
            </Button>
        </div>
    );
};

export {Admin};
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Box, Modal} from "@mui/material";
import {useState} from "react";
import {useForm} from "react-hook-form";
import Dropzone from "react-dropzone";

import {deviceActions} from "../../redux/slices";
import css from './Admin.module.css';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 34,
    p: 4,
};

const Admin = () => {
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm()

    const {device} = useSelector(state => state.deviceReducer)

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    let submit = async (device) => {
        try {
            await dispatch(deviceActions.create({device}))

        } catch (e) {
            console.log(e.message)
        }
    }

    const onDrop = async (files) => {
        try {
            const formData = new FormData();

            await files.map((file, index) => {
                formData.append("image", file);
            });

            await dispatch(deviceActions.uploadImage({_id: device._id, formData}));

            navigate('/devices')
        } catch (e) {
            console.log(e.message)
        }
    };

    return (
        <div className={css.container}>
            <h1>Add new device to shop</h1>
            <form className={css.form} onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'name'} {...register('name')}/>
                <input type='number' placeholder={'price'} {...register('price')}/>
                <input type='text' placeholder={'category'} {...register('category')}/>
                <input type='text' placeholder={'brand'} {...register('brand')}/>
                <input type='text' placeholder={'description'} {...register('description')}/>
                <button onClick={handleOpen}>Save and next</button>
            </form>

            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div className={css.dropZone}>
                        <Dropzone onDrop={onDrop}>
                            {({getRootProps, getInputProps}) => (
                                <div
                                    className="m-1"
                                    style={{
                                        width: "460px",
                                        height: "250px",
                                        border: "1px solid lightgray",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <p>Drag and drop files here or click to upload</p>
                                </div>
                            )}
                        </Dropzone>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export {Admin};
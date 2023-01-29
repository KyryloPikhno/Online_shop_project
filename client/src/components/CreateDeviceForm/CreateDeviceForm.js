import {Box, Modal} from "@mui/material";
import {useForm} from "react-hook-form";
import Dropzone from "react-dropzone";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {categoryActions, deviceActions} from "../../redux/slices";
import css from './CreateDeviceForm.module.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 34,
    p: 4,
    borderRadius:5
};

const CreateDeviceForm = () => {
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm()

    const {device} = useSelector(state => state.deviceReducer)

    const {categories} = useSelector(state => state.categoryReducer)

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(categoryActions.getAll())
    }, [])

    const submit = async (device) => {
        try {
            console.log(device);
            await dispatch(deviceActions.create({device}))

        } catch (e) {
            console.log(e.message)
        }
    }

    const onDrop = async (files) => {
        try {
            const formData = new FormData();

            await files.map((file) => {
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
                <select {...register('category', {required: true})}>
                    {categories.map(category => <option key={category._id}
                                                        value={category._id}>{category.name}</option>)}
                </select>
                <input type='text' placeholder={'brand'} {...register('brand')}/>
                <input type='number' placeholder={'countInStock'} {...register('countInStock')}/>
                <select value="black" {...register('color', {required: true})}>
                    <option value="black">black</option>
                    <option value="grey">grey</option>
                    <option value="pink">pink</option>
                    <option value="pink">gold</option>
                </select>
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
                    <div className={css.dropZoneContainer}>
                        <Dropzone onDrop={onDrop}>
                            {({getRootProps, getInputProps}) => (
                                <div className={css.dropZone} {...getRootProps()}>
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

export {CreateDeviceForm};
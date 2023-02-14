import {Box, Modal} from "@mui/material";
import {useForm} from "react-hook-form";
import Dropzone from "react-dropzone";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {brandActions, categoryActions, colorActions, deviceActions} from "../../redux/slices";
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

    const {register, handleSubmit} = useForm();

    const {device} = useSelector(state => state.deviceReducer);

    const {categories} = useSelector(state => state.categoryReducer);

    const {brands} = useSelector(state => state.brandReducer);

    const {colors} = useSelector(state => state.colorReducer);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    useEffect(() => {
        dispatch(categoryActions.getAll());
        dispatch(brandActions.getAll());
        dispatch(colorActions.getAll());
    }, [])

    const submit = async (device) => {
        try {
            await dispatch(deviceActions.create({device}));

        } catch (e) {
            console.log(e.message);
        }
    }

    const onDrop = async (files) => {
        try {
            const formData = new FormData();

            await files.map((file) => {
                formData.append("image", file);
            });

            await dispatch(deviceActions.uploadImage({_id: device._id, formData}));

            navigate('/devices');
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className={css.container}>
            <h1>Add new device to shop</h1>
            <form className={css.form} onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'name'} {...register('name')}/>
                <input type='number' placeholder={'price'} {...register('price')}/>
                <input type='number' placeholder={'countInStock'} {...register('countInStock')}/>
                <select {...register('category', {required: true})}>
                    {categories.map(category => <option key={category._id}
                                                        value={category._id}>{category.name}</option>)}
                </select>
                <select {...register('brand', {required: true})}>
                    {brands.map(brand => <option key={brand._id}
                                                        value={brand._id}>{brand.name}</option>)}
                </select>
                <select {...register('color', {required: true})}>
                    {colors.map(color => <option key={color._id}
                                                        value={color._id}>{color.name}</option>)}
                </select>
                <input type='text' placeholder={'description'} {...register('description')}/>
                <button onClick={handleOpen}>Save and next</button>
            </form>
            <Modal
                keepMounted
                open={open}
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
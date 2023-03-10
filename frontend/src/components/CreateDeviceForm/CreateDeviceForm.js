import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {joiResolver} from "@hookform/resolvers/joi";
import {useNavigate} from "react-router-dom";
import {Box, Modal} from "@mui/material";
import {useForm} from "react-hook-form";
import Dropzone from "react-dropzone";

import {brandActions, categoryActions, colorActions, deviceActions} from "../../redux/slices";
import {newDeviceValidator} from "../../validators";
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

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver: joiResolver(newDeviceValidator),
        mode: 'all'
    });

    const {categories} = useSelector(state => state.categoryReducer);

    const {device} = useSelector(state => state.deviceReducer);

    const {brands} = useSelector(state => state.brandReducer);

    const {colors} = useSelector(state => state.colorReducer);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    useEffect(() => {
        dispatch(categoryActions.getAll());
        dispatch(brandActions.getAll());
        dispatch(colorActions.getAll());
    }, []);

    const submit = async (device) => {
        try {
            await dispatch(deviceActions.create({device}));
        } catch (e) {
            console.log(e.message);
        }
    };

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
                <input type='text' placeholder={'Name'} {...register('name')}/>
                {errors.name && <span>{errors.name.message}</span>}

                <input type='number' placeholder={'Price'} {...register('price')}/>
                {errors.price && <span>{errors.price.message}</span>}

                <input type='number' placeholder={'Count in stock'} {...register('countInStock')}/>
                {errors.countInStock && <span>{errors.countInStock.message}</span>}

                <select {...register('category', {required: true})}>
                    {categories.map(category => <option key={category._id}
                                                        value={category._id}>{category.name}</option>)}
                </select>
                {errors.category && <span>{errors.category.message}</span>}

                <select {...register('brand', {required: true})}>
                    {brands.map(brand => <option key={brand._id}
                                                 value={brand._id}>{brand.name}</option>)}
                </select>
                {errors.brand && <span>{errors.brand.message}</span>}

                <select {...register('color', {required: true})}>
                    {colors.map(color => <option key={color._id}
                                                 value={color._id}>{color.name}</option>)}
                </select>
                {errors.color && <span>{errors.color.message}</span>}

                <input type='text' placeholder={'Description'} {...register('description')}/>
                {errors.description && <span>{errors.description.message}</span>}

                <button className={!isValid ? css.noValidButton : css.validButton} disabled={!isValid}
                        onClick={handleOpen}>Save and next
                </button>
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
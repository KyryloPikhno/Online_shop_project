import {Box, Modal} from "@mui/material";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {NavLink} from "react-router-dom";

import {passwordForgotService} from "../../services";
import css from './PasswordForgot.module.css';


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


const PasswordForgot = () => {
    let {register, handleSubmit} = useForm({
        defaultValues: {
            "name": null,
            "email": null,
        }
    })

    const [open, setOpen] = useState(false);

    let submit = async (user) => {
        try {
            await passwordForgotService.forgotPassword(user);

            await setOpen(true)
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div>
            <form className={css.form} onSubmit={handleSubmit(submit)}>
                <p>To reset your password, enter your name and email address you use to sign in.</p>
                <input type='text' placeholder={'name'} {...register('name')}/>
                <input type='text' placeholder={'email'} {...register('email')}/>
                <button>Get reset link</button>
            </form>
            <Modal
                keepMounted
                open={open}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div className={css.modalInfo}>
                        <h1>Check your email</h1>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUufwNUpDO-QJgbjTP78P6r1XxX9pHyfVwJg&usqp=CAU"
                            alt="smiley-icon"/>
                        <p>Check your<span>email</span>inbox for instructions from us on how to reset your password.</p>
                        <NavLink to={'/login'}>Go back to login screen</NavLink>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export {PasswordForgot};
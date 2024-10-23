import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { toast, useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
    email: '',
    password: ''
}

const AuthLogin = () => {
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const { toast } = useToast();
    const navigate = useNavigate();

    const isFormValid = () => {
        return Object.keys(formData).map((key) => formData[key] !== '').every(item => item);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData)).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message,
                })
            } else {
                toast({
                    title: data?.payload?.message,
                    variant: 'destructive'
                })
            }
        })
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
                <p className="mt-2">
                    Don't have an account? Click&nbsp;
                    <Link className="font-medium text-primary hover:underline" to="/auth/register">here</Link> to Register
                </p>
            </div>
            <CommonForm formControls={loginFormControls} buttonText={'Sign In'} formData={formData} setFormData={setFormData} onSubmit={onSubmit} buttonEnable={isFormValid()} ></CommonForm>
        </div>
    )
}

export default AuthLogin;
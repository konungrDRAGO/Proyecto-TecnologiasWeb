import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "@/services/usuarioServices";

type RegisterFormInputs = {
    name:string;
    email: string;
    password: string;
    password2: string;
};

export function RegisterForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterFormInputs>();

    const onSubmit = (data: RegisterFormInputs) => {
        console.log("Datos enviados:", data);
        registrarUsuario(data.email,data.name,"USUARIO",data.password);
        navigate('/login')
        // Función para registrar usuario.
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f8ff] dark:bg-background px-4 transition-colors duration-300">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white dark:bg-[#1f2533] text-black dark:text-white p-8 rounded-xl shadow-md w-full max-w-sm text-center space-y-4 transition-colors duration-300"
            >
                <div className="w-full flex items-start">
                    <button type="button" className="w-1/3 flex items-start" onClick={() => navigate('/login')}>
                        <ChevronLeft size={44} className="text-[#5177a6] hover:text-[#3e5f8a] dark:text-[#3e5f8a] dark:hover:text-[#2c4a70]" />
                    </button>
                    <div className="text-8xl text-gray-300 dark:text-gray-600 mb-4 w-1/3">★</div>
                </div>
                {/* Nombre */}
                <div>
                <Input
                    type="text"
                    placeholder="Nombre Completo"
                    {...register("name", { required: "El nombre es obligatorio" })}
                    className="bg-[#2c2f4a] dark:bg-[#292F42] text-white placeholder:text-gray-300 rounded-full px-4"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1 text-left">{errors.email.message}</p>
                )}
                </div>

                {/* Email */}
                <div>
                <Input
                    type="email"
                    placeholder="tu@email.com"
                    {...register("email", { required: "El email es obligatorio" })}
                    className="bg-[#2c2f4a] dark:bg-[#292F42] text-white placeholder:text-gray-300 rounded-full px-4"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1 text-left">{errors.email.message}</p>
                )}
                </div>

                {/* Password */}
                <div className="flex items-center justify-start bg-[#2c2f4a] dark:bg-[#292F42] rounded-full pl-1 pr-4">
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    {...register("password", {
                        required: "Este campo es obligatorio",
                        minLength: {
                        value: 8,
                        message: "La contraseña debe tener al menos 8 caracteres"
                        }
                    })}
                    className="flex bg-transparent border-0 text-white placeholder:text-gray-300 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
                />
                    <button
                        type="button"
                        className="text-white ml-2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1 text-left">
                        {errors.password.message}
                    </p>
                )}

                {/* Password 2 */}
                <div className="flex items-center justify-start bg-[#2c2f4a] dark:bg-[#292F42] rounded-full pl-1 pr-4">
                <Input
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Repetir Contraseña"
                    {...register("password2", {
                        required: "Este campo es obligatorio",
                        validate: (value) =>
                        value === watch("password") || "Las contraseñas no coinciden"
                    })}
                    className="flex bg-transparent border-0 text-white placeholder:text-gray-300 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
                />
                    <button
                        type="button"
                        className="text-white ml-2"
                        onClick={() => setShowPassword2(!showPassword2)}
                    >
                        {showPassword2 ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>

                {errors.password2 && (
                    <p className="text-red-500 text-sm mt-1 text-left">
                        {errors.password2.message}
                    </p>
                )}

                <Button
                type="submit"
                className="w-full rounded-full bg-[#5177a6] hover:bg-[#3e5f8a] dark:bg-[#3e5f8a] dark:hover:bg-[#2c4a70]"
                >
                Registrarse
                </Button>
            </form>
        </div>
    );
}

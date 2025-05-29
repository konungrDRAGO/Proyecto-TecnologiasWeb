import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  password: string;
};

export function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {login} = useUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const onSubmit = (data: LoginFormInputs) => {
        console.log("Datos enviados:", data);
        login();
        navigate('/')
        // Simular login o actualizar UserContext aquí
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f8ff] dark:bg-background px-4 transition-colors duration-300">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white dark:bg-[#1f2533] text-black dark:text-white p-8 rounded-xl shadow-md w-full max-w-sm text-center space-y-4 transition-colors duration-300"
            >
                <div className="text-8xl text-gray-300 dark:text-gray-600 mb-4">★</div>

                {/* Email */}
                <div>
                <Input
                    type="email"
                    placeholder="tu@email.com"
                    {...register("email", { required: "Este campo es obligatorio" })}
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
                    {...register("password", { required: "Este campo es obligatorio" })}
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

                <Button
                type="submit"
                className="w-full rounded-full bg-[#5177a6] hover:bg-[#3e5f8a] dark:bg-[#3e5f8a] dark:hover:bg-[#2c4a70]"
                >
                Iniciar Sesión
                </Button>

                <p className="text-sm text-black dark:text-gray-300">
                ¿No tienes cuenta?{" "}
                <a href="#" className="font-semibold underline dark:text-white">
                    Regístrate aquí
                </a>
                </p>
            </form>
        </div>
    );
}
